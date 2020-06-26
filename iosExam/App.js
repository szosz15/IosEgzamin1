
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import md5 from 'md5'

export default function App() {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [generatedMD5, setGeneratedMD5] = React.useState('');
  const [resultFromApi, setResultFromApi] = React.useState('');

  const apiCall = async (md5String) => {
    try {
      console.log("md5string",md5String)
      const url = `http://sroczynski.pl/iosexamrest/examresult/${md5String}`;
      console.log("url", url)
      const response = await fetch(url);
      const resJson = await response.json();
      console.log("json", resJson)
      setResultFromApi(resJson.result)

    }
    catch (err) {
      console.log("error")
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Enter your name</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setName(text)}
      value={name}
    />
<Text style={{ marginTop: 12}}>Enter your surname</Text>
<TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setSurname(text)}
      value={surname}
    />
      </View>
      <Button
  onPress={() => {
    const string = `${surname} ${name}`;
    console.log(string)
    const generateMD5String = md5(`${surname} ${name}`)
    setGeneratedMD5(generateMD5String);
    apiCall(generateMD5String)
  }}
  title="Generate MD5"
  color="#841584"
/>
<View style={{ marginTop: 24}}>
      <Text>Api response: </Text>
      <Text>{resultFromApi}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%'
  }
});
