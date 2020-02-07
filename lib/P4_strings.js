'use babel';
export const _find= (text, pattern) => {
    return text.match(pattern) ? text.match(pattern)  : [' ']
}
export  const v1model=["header", "parser", "verify_checksum", "ingress", "egress", "compute_checksum", "deparser", "V1 Model Switch"]
export const ebpfmodel=["header", "ebpf parser" , "filter", "ebpf Filter model"]
export const xdpmodel=["header", "xdp_parser", "xdp_filter", "xdp_deparser", "xdp model"]
export const tnamodel= [""] //TODO
export const ebpf_parser_string=()=>{
    let start= "parser ThisParser(packet in pack, out headers_t headers)\n {\n      state start\n       {\n         default : reject;\n        }\n}\n"
    return start;
}
export const filter_string=()=>{
    let start = "control ThisFilter(inout Headers_t headers, out bool pass)\n{\n        pass=false;\n}"
    return start;
}
export const ebpf_filter_string=()=>{
    let start= "ebpfFilter(ThisParser(),\nThisFilter())\nmain;\n"
    return start
}
export const v1_model_string=()=>{
    return ("V1Switch(\nThisParser(),\nThisChecksum(),\nThisIngress(), \n ThisEgress(),\nThisChecksumCompute(),\nThisDeparser()\n)main;")
}
export const xdp_model_string=()=>{
    let start= "XDPSwitch(ThisParser(),\nThisFilter(),\nThisDeparser())\nmain;\n"
    return start
}
export const xdp_filter_string=()=>{
    let start = "control ThisFilter(inout Headers_t headers, in xdp_input metadata, out xdp_output pass)\n{\n        pass=XDP_DROP;\n}"
    return start;
}

export const xdp_deparser_string=()=>{
    return "control ThisDeparser(in  headers, packet_out pack) { \n apply {\n ;\n           }\n     } "
}

export const comment= (text)=>{
    let strb= "\n/*";
    let stre="*/\n";
    let pre="-:".repeat(36);
    let pre1="-:".repeat(3);
    var t=(32 - (text.length))/2
    text= text.toUpperCase();
    text=text.split("");
    strin=strb.concat("- ".repeat(40),"\n",pre, "\n","   ", pre1, "  ".repeat(t))
    var i;
    for (i=0; i<text.length; i++){
        strin+= " " + text[i];
    }
    strin=strin.concat("  ".repeat(t), pre1,  "\n",  pre, "\n",  "- ".repeat(40), stre);
    return strin;
}
export const parser_string=()=>{
    start="parser   ThisParser(packet_in packet, \n         out headers hdr, \n         inout metadata meta, \n,        inout standard_metadata_t standard_metadata)  {\n";
    start= start.concat("   state start {\n /* TODO */ \n        transition reject\n      }\n    }\n");
    return start;
}
export  const verify_checksum_string=()=>{
    return  "control ThisChecksum( inout headers hdr, inout metadata meta) {  \n     apply {  }\n}"
    //TODO
}
export const ingress_string=()=>{
    start="control ThisIngress (inout headers hdr, \n           inout metadata meta,\n                inout standard_metadata_t standard_metadata) {"
    start=start.concat("\n".repeat(4))
    start=start.concat("}")
    return start
}//TODO
export const egress_string=()=>{
    start="control ThisEgress(inout headers hdr,\n                inout metadata meta,\n                    inout standard_metadata_t standard_metadata) {\n}"
    return start
}
export const compute_checksum_string=()=>{
    start ="control ThisComputeChecksum(inout headers hdr, inout metadata meta) {\n       apply {\n}"
    return start
}
//TODO

export const deparser_string=()=>{
    start="control ThisDeparser(packet_out packet, in headers hdr) {\n            apply {\n    \n     }\n}"
    // TODO:
    return start;
}
