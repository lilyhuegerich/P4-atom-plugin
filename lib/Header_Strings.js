'use babel';

export  const IPv4=()=>{
    return "header ipv4_t  {\n    bit<4>      version;\n    bit<4>      ihl;\n    bit<8>      diffserv;\n    bit<16>      totalLen;\n    bit<16>      identification;\n    bit<3>      flags;\n    bit<13>      fragOffseet;\n    bit<8>      ttl;\n    bit<8>      protocol;\n    bit<4>      hdrChecksum;\n    bit<4>      version;\n    bit<32>      srcAddr;\n    bit<32>      dstAddr;\n }"
}
export const IPv6=()=>{
    return "header ipv6_t  {\n    bit<4>      version;\n    bit<6>      ds;\n    bit<4>      ecn;\n    bit<20>      flowLabel;\n    bit<4>      payloadLen;\n    bit<8>      nextHeader;\n    bit<8>      hopLimit;\n    bit<128>      srcAddr;\n    bit<128>      dstAddr;\n}"
}
export const Ethernet=()=>{
    return "header ethernet_t {\n    bit<48>      dstAddr;\n    bit<48>      srcAddr;\n    bit<16>      etherType;\n   }"
}
export const TCP=()=>{
    return "header tcp_t{\n    bit<16>      srcPort;\n    bit<16>      dstPort;\n    bit<32>      seqNo;\n    bit<32>      ackNo;\n    bit<4>      dataOffset;\n    bit<4>      res;\n    bit<1>      cwr;\n    bit<1>      ece;\n    bit<1>      urg;\n    bit<1>      ack;\n    bit<1>      psh;\n    bit<1>      rst;\n    bit<1>      syn;\n    bit<1>      fin;\n    bit<16>      window;\n    bit<16>      checksum;\n    bit<16>      urgentPtr;\n  }"
}
export const UDP=()=> {
    return "header udp_t{\n    bit<16>      srcPort;\n    bit<16>      dstPort;\n    bit<16>      length;\n    bit<16>      checksums;\n  }"
}
export const Header_string=()=>{
    return "//TODO define needed headers, for autocomplete use cmd-alt-t\n\n\nstruct headers {\n\n //TODO insert names of your headers here\n\n\n} \n\n\n\n struct metadata {\n\n\n}"
}
