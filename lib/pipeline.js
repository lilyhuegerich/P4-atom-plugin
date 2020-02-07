'use babel';

import PipelineView from './pipeline-view';
import * as P4_strings from './P4_strings';
import * as Header_strings from './Header_strings';
import { CompositeDisposable } from 'atom';


export default {

  pipelineView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {

    this.pipelineView = new PipelineView(state.pipelineViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pipelineView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pipeline:structure': () => this.structure(),
      'pipeline:headers': () => this.header(),
      'pipeline:help_desk': () => this.help_desk(),
    }
    ));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pipelineView.destroy();
  },




  serialize() {
    return {
      pipelineViewState: this.pipelineView.serialize()
    };
  },

  help_desk() {
      //TODO
      let editor
      notification = atom.notifications.addInfo("Welcome to P4 Pipeline Plugin\n For details on tools please ckick the below buttons\n", {
      dismissable: true,
      buttons: [
        {
          text: "Pre-Structure Pipeline",
          onDidClick: function() {
            atom.notifications.addInfo("To pre structure a P4 pipeline please type model name (supported models are EBPF, XDP, TNA, and V1mod)\n then cmd-alt-t"),{ dismissable: true}
          }
      },
      {
      text: "Header Field Auto-Complete",
      onDidClick: function() {
        atom.notifications.addInfo("To auto fill standard header structs please type the header name (supported are IPv4, IPv6, TCP, UDP, and Ethernet) \n then ... \n Please note that if Pre-structure pipline has already been called the headers will be inserted at the proper place, else, they will be inserted at the spot of the cursor."),{ dismissable: true}
        return
      }
  },

      ]
    });
      return;
  },

 header() {
      let editor

      let ipv4= /^ip.4/i;
      let ipv6=/^ip.6/i;
      let tcp= /^tcp/i;
      let udp=/^udp/i;
      let ethernet=/^ethernet/i;

      if (editor = atom.workspace.getActiveTextEditor()) {

          let line = editor.getLastCursor().getCurrentBufferLine();
          let word_f= line.split(' ').slice(-1)[0];

          if (word_f.endsWith(' ')){
              return;
          }

        editor.selectLeft(word_f.length);
        if (ipv4.test(word_f)){
            impor="ipv4";
            to_print=Header_strings.IPv4();
        }
        else if (ipv6.test(word_f)){
            impor="ipv6";
            to_print=Header_strings.IPv6();
        }
        else if (ethernet.test(word_f)) {
            impor= "ethernet";
            to_print=Header_strings.Ethernet();
            }
        else if (tcp.test(word_f)) {
            impor="";
            to_print=Header_strings.TCP();
        }
        else if (udp.test(word_f)) {
            impor="";
            to_print=Header_strings.UDP();
        }
    else {
        atom.notifications.addWarning("No matching Header found, for help press cmd-h")
        to_print=""
    }
    if (to_print.length >0){
        editor.insertText(to_print);
        return;
    }
}

},

  structure() {

    let editor
    let to_print=""
    let v1mod= /^v1model/i;
    let ebpf=/^ebpf/i;
    let xdp=/^xdp/i;
    let tna= /^tna/i;
    let impor= []

    if (editor = atom.workspace.getActiveTextEditor()) {

        let line = editor.getLastCursor().getCurrentBufferLine();
        let word_f= line.split(' ').slice(-1)[0];
        if (word_f.endsWith(' ')){
            return;
        }
        editor.selectLeft(word_f.length);
        if (v1mod.test(word_f)){
            impor=P4_strings.v1model;
            to_print=to_print.concat("#include <core.p4>\n#include <v1model.p4> \n\n\n");
            atom.notifications.addSuccess('V1 model Template inserted')
        }
        if (ebpf.test(word_f)){
            impor=P4_strings.ebpfmodel;
            to_print=to_print.concat("#include <core.p4>\n#include <ebpf_model.p4> \n\n\n");
            atom.notifications.addSuccess('EBPF model Template inserted')
        }
        if (xdp.test(word_f)){
            impor=P4_strings.xdpmodel;
            to_print=to_print.concat("#include <core.p4>\n#include <ebpf_model.p4> \n#include <xdp_model.p4>\n\n\n");
            atom.notifications.addSuccess('XDP model Template inserted')
        }
        if (tna.test(word_f)){
            impor=P4_strings.tnamodel;
            atom.notifications.addWarning('TNA properitary still needs to be checked')
        }
        if(impor.length>0){
            var b
            for (b=0; b<impor.length; b++){
                to_print=to_print.concat(P4_strings.comment(impor[b]))
                to_print=to_print.concat("\n".repeat(2))
                let tmp
                switch (impor[b]){
                    case "parser":
                        tmp=P4_strings.parser_string()
                        break;
                    case "verify_checksum":
                        tmp=P4_strings.verify_checksum_string();
                        break;
                    case "ingress":
                        tmp=P4_strings.ingress_string();
                        break;
                    case "egress":
                        tmp=P4_strings.egress_string();
                        break;
                    case "compute_checksum":
                        tmp=P4_strings.compute_checksum_string();
                        break;
                    case "deparser":
                        tmp=P4_strings.deparser_string();
                        break;
                    case "V1 Model Switch":
                        tmp=P4_strings.v1_model_string()
                        break;
                    case "ebpf parser":
                        tmp=P4_strings.ebpf_parser_string()
                        break;
                    case "filter":
                        tmp=P4_strings.filter_string()
                        break;
                    case "ebpf Filter model":
                        tmp=P4_strings.ebpf_filter_string()
                        break;
                    case "xdp_parser":
                        tmp=P4_strings.ebpf_parser_string()
                        break;
                    case "xdp_filter":
                        tmp=P4_strings.xdp_filter_string()
                        break;
                    case "xdp_deparser":
                        tmp=P4_strings.xdp_deparser_string()
                        break;
                    case "xdp model":
                        tmp=P4_strings.xdp_model_string()
                        break;
                    case "header":
                        tmp=Header_strings.Header_string()
                        break;
                    default:
                        tmp=""
                        break;
                    }
                    to_print=to_print.concat(tmp)
                    to_print=to_print.concat("\n".repeat(2))
            }
            editor.insertText(to_print);

  }
    else{
        atom.notifications.addWarning("No matching Model found, for help press cmd-h")
     }
 }
 }
 };
