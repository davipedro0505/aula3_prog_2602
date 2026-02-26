import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

//login ==================================================

function Login ({navigation}){
  const [login, setLogin] = useState ('');
  const [senha, setSenha] = useState ('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="login"
        value={login}
        onChangeText={setLogin}
      />

      <TextInput
        style={styles.input}
        placeholder="senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.botaoAzul}
        onPress={() => navigation.navigate('Lista')}
      >
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVermelho}
        onPress={() => navigation.navigate('CadastroUsuario')}
      >
        <Text style={styles.textoBotao}>Cadastre-se</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

//lista de contatos ==================================================

function Lista({ navigation }) {
  const [contatos, setContatos] = useState([
    { nome: 'Marcos Andrade', telefone: '81 988553424', email: 'marcos@gmail.com' },
    { nome: 'Patrícia Tavares', telefone: '81 998765332', email: 'patricia@gmail.com' },
    { nome: 'Rodrigo Antunes', telefone: '81 987765525', email: 'rodrigo@gmail.com' },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>LISTA DE CONTATOS</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CadastroContato', { setContatos, contatos })
          }
        >
          <FontAwesome name="plus" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {contatos.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              navigation.navigate('AlterarExcluir', {
                contato: item,
                index,
                contatos,
                setContatos,
              })
            }
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.telefone}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}


//cadastro de usuarios usuario ==================================================

function CadastroUsuario({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* HEADER IGUAL DA IMAGEM */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <FontAwesome name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Usuário</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTEÚDO */}
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="nome" />
        <TextInput style={styles.input} placeholder="cpf" />
        <TextInput style={styles.input} placeholder="email" />
        <TextInput style={styles.input} placeholder="senha" secureTextEntry />

        <TouchableOpacity style={styles.botaoAzul}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// cadastro de contatos ==================================================

function CadastroContato({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const { contatos, setContatos } = route.params;

  const salvar = () => {
    const novo = { nome, email, telefone };
    setContatos([...contatos, novo]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>CADASTRO DE CONTATO</Text>

      <TextInput style={styles.input} placeholder="Nome" onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Telefone" onChangeText={setTelefone} />

      <TouchableOpacity style={styles.botaoAzul} onPress={salvar}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

//alterar e excluir ==================================================

function AlterarExcluir({ navigation, route }) {
  const { contato, index, contatos, setContatos } = route.params;

  const [nome, setNome] = useState(contato.nome);
  const [email, setEmail] = useState(contato.email);
  const [telefone, setTelefone] = useState(contato.telefone);

  const alterar = () => {
    const lista = [...contatos];
    lista[index] = { nome, email, telefone };
    setContatos(lista);
    navigation.goBack();
  };

  const excluir = () => {
    const lista = contatos.filter((_, i) => i !== index);
    setContatos(lista);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>ALTERAÇÃO / EXCLUSÃO DE CONTATOS</Text>

      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />

      <TouchableOpacity style={styles.botaoAzul} onPress={alterar}>
        <Text style={styles.textoBotao}>Alterar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVermelho} onPress={excluir}>
        <Text style={styles.textoBotao}>Excluir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// app ==================================================

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Lista" component={Lista} />
          <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
          <Stack.Screen name="CadastroContato" component={CadastroContato} />
          <Stack.Screen name="AlterarExcluir" component={AlterarExcluir} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
//***************************************************************************

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e4b8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
  },

  botaoAzul: {
    backgroundColor: 'blue',
    padding: 12,
    width: 250,
    alignItems: 'center',
    marginTop: 10,
  },

  botaoAzulClaro: {
    backgroundColor: 'black',
    padding: 12,
    width: 250,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  header: {
    backgroundColor: '#3b82f6',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    padding: 15,
    borderBottomWidth: 1,
  },

  nome: {
    fontWeight: 'bold',
  },
});