import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

export default function ThanksModal({ visible }: { visible: boolean }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={s.backdrop}>
        <View style={s.card}>
          <View style={s.circle}><Text style={s.check}>✓</Text></View>
          <Text style={s.title}>Teşekkürler!</Text>
          <Text style={s.sub}>Geri bildiriminiz alındı.</Text>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop:{flex:1,backgroundColor:'rgba(0,0,0,.25)',justifyContent:'center',alignItems:'center',padding:24},
  card:{width:'100%',maxWidth:280,backgroundColor:'#fff',borderRadius:12,padding:18,alignItems:'center',
    shadowColor:'#000',shadowOpacity:.12,shadowRadius:12,elevation:4},
  circle:{width:44,height:44,borderRadius:22,backgroundColor:'#E8FFF1',alignItems:'center',justifyContent:'center',marginBottom:8},
  check:{fontSize:22,color:'#0A7F2E',fontWeight:'800'},
  title:{fontWeight:'800',color:'#0B1324',marginTop:2},
  sub:{color:'#6B7280',marginTop:4},
});