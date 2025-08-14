import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';

// Ana ekranlar
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';

// İletişim (guest ve login)
import ContactScreen from '../screens/ContactScreen';                // Guest
import ContactPersonalScreen from '../screens/ContactPersonalScreen';// Login

// Modüller
import RequestFormScreen from '../screens/RequestFormScreen';
import OutageInquiryScreen from '../screens/OutageInquiryScreen';
import CompensationScreen from '../screens/CompensationScreen';
import ApplicationStatusScreen from '../screens/ApplicationStatusScreen';
import ContactHistoryScreen from '../screens/ContactHistoryScreen';
import PaymentsScreen from '../screens/PaymentsScreen';

// Abonesiz
import GuestMenuScreen from '../screens/GuestMenuScreen';
import LeakReportScreen from '../screens/LeakReportScreen';
import FaultReportScreen from '../screens/FaultReportScreen';
import ServicePointsScreen from '../screens/ServicePointsScreen';

// Hesabım akışı
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import InstallationListScreen from '../screens/InstallationListScreen';
import InstallationDetailScreen from '../screens/InstallationDetailScreen';

// Başvuru akışı
import RequestEmptyScreen from '../screens/RequestEmptyScreen';
import RequestEntryScreen from '../screens/RequestEntryScreen';
import InstallationPickScreen from '../screens/InstallationPickScreen';

export type RootStackParamList = {
  // Auth
  Login: undefined;
  Otp: {
    tcOrVkn: string;
    type: 'Sahis' | 'Tuzel';
    context?: 'login' | 'guest' | 'request';
  };

  // BottomBar ile gittiğimiz ana sayfalar
  Home: undefined;
  Account: undefined;

  // İletişim varyantları
  Contact: undefined;          // Guest iletişim
  ContactPersonal: undefined;  // Login iletişim

  // Başvuru akışı
  RequestEmpty: undefined;
  RequestEntry: undefined;
  InstallationPick: { prefill?: any } | undefined;

  // Modüller
  RequestForm:
    | {
        installationNo?: string;
        prefill?: {
          ownership?: string;
          tc?: string;
          name?: string;
          surname?: string;
          email?: string;
          phone?: string;
          address?: {
            il?: string;
            ilce?: string;
            mahalle?: string;
            cadde?: string;
            binaNo?: string;
            daireNo?: string;
          };
        };
      }
    | undefined;

  OutageInquiry: undefined;
  Compensation: undefined;
  ApplicationStatus: undefined;
  ContactHistory: undefined;
  Payments: undefined;

  // Abonesiz
  GuestMenu: undefined;
  LeakReport: undefined;
  FaultReport: undefined;
  ServicePoints: undefined;

  // Hesabım alt akışı
  PersonalInfo: undefined;
  InstallationList: undefined;
  InstallationDetail: {
    contractStatus: 'AKTİF' | 'PASİF';
    contractNo: string;
    installationNo: string;
    name: string;
    surname: string;
    startDate: string;
    endDate?: string;
    city: string;
    district: string;
    village?: string;
    neighborhood: string;
    street: string;
    buildingNo: string;
    doorNo: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
      {/* Auth */}
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={OtpScreen} options={{ title: 'Doğrulama' }} />

      {/* Ana sayfalar */}
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />

      {/* İletişim */}
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'İletişim' }} />
      <Stack.Screen name="ContactPersonal" component={ContactPersonalScreen} options={{ title: 'İletişim' }} />

      {/* Hesabım akışı */}
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ title: 'Kişisel Bilgilerim' }} />
      <Stack.Screen name="InstallationList" component={InstallationListScreen} options={{ title: 'Tesisat Bilgileri' }} />
      <Stack.Screen name="InstallationDetail" component={InstallationDetailScreen} options={{ title: 'Tesisat Detay' }} />

      {/* Modüller */}
      <Stack.Screen
        name="RequestForm"
        component={RequestFormScreen}
        options={{ title: 'Talep / İhbar' }}
        // route.params gelmese bile TS rahat etsin diye default veriyoruz
        initialParams={{ installationNo: undefined, prefill: undefined }}
      />
      <Stack.Screen name="OutageInquiry" component={OutageInquiryScreen} options={{ title: 'Kesinti Sorgulama' }} />
      <Stack.Screen name="Compensation" component={CompensationScreen} options={{ title: 'Tazminat' }} />
      <Stack.Screen name="ApplicationStatus" component={ApplicationStatusScreen} options={{ title: 'Başvuru Durumları' }} />
      <Stack.Screen name="ContactHistory" component={ContactHistoryScreen} options={{ title: 'İletişim Geçmişi' }} />
      <Stack.Screen name="Payments" component={PaymentsScreen} options={{ title: 'Ödeme İşlemleri' }} />

      {/* Başvuru akışı */}
      <Stack.Screen name="RequestEmpty" component={RequestEmptyScreen} options={{ title: 'Başvuru Oluştur' }} />
      <Stack.Screen name="RequestEntry" component={RequestEntryScreen} options={{ title: 'TALEP İHBAR ŞİKAYET FORMU' }} />
      <Stack.Screen name="InstallationPick" component={InstallationPickScreen} options={{ title: 'TALEP İHBAR ŞİKAYET FORMU' }} />

      {/* Abonesiz */}
      <Stack.Screen name="GuestMenu" component={GuestMenuScreen} options={{ title: 'Abonesiz İşlemler' }} />
      <Stack.Screen
        name="LeakReport"
        component={LeakReportScreen}
        options={{
          title: 'TALEP İHBAR ŞİKAYET FORMU',
          headerStyle: { backgroundColor: '#002B5B' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="FaultReport"
        component={FaultReportScreen}
        options={{
          title: 'TALEP İHBAR ŞİKAYET FORMU',
          headerStyle: { backgroundColor: '#002B5B' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="ServicePoints"
        component={ServicePointsScreen}
        options={{
          title: 'Tüketici Hizmet Noktaları',
          headerStyle: { backgroundColor: '#183A66' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}