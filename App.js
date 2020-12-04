import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import axios from 'axios';



export default class app extends React.Component {

  state = {
    response: [],
    estado: false,
    name:''
  }

  setpersonaje(p) {
    var per = p;
    this.setState({ value: per });
  }

   buscarpersonaje = async() => {
    var per = this.state.value;

    await axios.get("https://kitsu.io/api/edge/characters/" + per)
      .then(res => {
        console.log(res.data.data.attributes.canonicalName);
        if (res.data != false) {
          this.setState({
            response: res.data,
            estado: true,
            name:res.data.data.attributes.canonicalName
          })//debug
          console.log("asta aca");//aca rompe la vista 
          console.log( this.state.name);//este no lo encuentra 
        } else {
          console.log("Error");
        }
      });
  }

  render() {
    if (this.state.estado != true) {
      return (

        <View style={styles.container}>
          <Text>busca personaje por id?</Text>
          <TextInput
            style={{ height: 70, borderColor: 'gray', borderWidth: 1, margin: 15, padding: 10 }}
            onChangeText={this.setpersonaje.bind(this)}
          />
          <Button
            onPress={this.buscarpersonaje.bind(this)}
            title="Buscar"
            color="#4f9a94"
          />
          
        </View>

      );
    } else {
      return (

        <View style={styles.container}>

          <Text>busca un personaje por id </Text>
          <TextInput
            style={{ height: 70, borderColor: 'gray', borderWidth: 1, margin: 15, padding: 10 }}
            onChangeText={this.setpersonaje.bind(this)}

          />
          <Button
            onPress={this.buscarpersonaje.bind(this)}
            title="Buscar"
            color="#4f9a94"
          />
          <Text style={styles.box}>nombre :{this.state.name}</Text>
          <Text style={styles.box}>nombre en japones : {this.state.response.data.attributes.names.ja_jp}</Text>
          <Text style={styles.box} >otro nombre : {this.state.response.data.attributes.otherNames}</Text>
          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b0bec5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    
    textAlign: 'center',
    padding: 5,
  }

});
//shift alt f acomoda