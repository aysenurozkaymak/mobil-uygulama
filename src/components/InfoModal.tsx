import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function InfoModal({
  visible,
  title = 'Kayıt Bulunamadı.',
  desc = 'Çağrı Merkezini arayarak veya Hizmet Noktalarımıza gidebilirsiniz.',
  onClose,
}: {
  visible: boolean;
  title?: string;
  desc?: string;
  onClose: () => void;
}) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={s.backdrop}>
        <View style={s.card}>
          <View style={s.badge}><Text style={{fontSize:18}}>⚠️</Text></View>
          <Text style={s.title}>{title}</Text>
          <Text style={s.desc}>{desc}</Text>
          <TouchableOpacity style={s.btn} onPress={onClose}>
            <Text style={s.btnTxt}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop:{flex:1,backgroundColor:'rgba(0,0,0,0.35)',alignItems:'center',justifyContent:'center'},
  card:{width:280,borderRadius:12,backgroundColor:'#fff',padding:16,alignItems:'center'},
  badge:{width:44,height:44,borderRadius:22,alignItems:'center',justifyContent:'center',backgroundColor:'#EAF2FF',marginBottom:8},
  title:{fontWeight:'700',color:'#111827',marginTop:2},
  desc:{textAlign:'center',color:'#4B5563',marginTop:6},
  btn:{alignSelf:'stretch',backgroundColor:'#E5E7EB',borderRadius:8,marginTop:12,paddingVertical:12},
  btnTxt:{textAlign:'center',fontWeight:'700',color:'#374151'},
});
