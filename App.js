import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react'

let personas = [
  { nombre: 'Thor', apellido: 'Thillas', cedula: '02456847894' },
  { nombre: 'Amber', apellido: 'Flores', cedula: '17548963251' },
  { nombre: 'Peter', apellido: 'Parker', cedula: '14784512369' }

];
//esNuevo indica si se esta creando una persona  o esta modificando la persona
let esNuevo = true;
//esta variable almacena el indice del arreglo del elemento seleccionado apra edicion
let indiceSeleccionado = -1;


export default function App() {

  const [txtCedula, setTxtCedula] = useState();
  const [txtNombre, setTxtNombre] = useState();
  const [txtApellido, setTxtApellido] = useState();
  const [numElementos, setNumElementos] = useState();

  let ItemPersona = ({indice, persona}) => {
    return (<View style={styles.itemPersona}>
      <View style={styles.itemIdice}>
        <Text style={styles.textPrincipal}>{indice}</Text>
        {setNumElementos(personas.length)}
      </View>

      <View style={styles.itemContenido}>
        <Text style={styles.textPrincipal}>
          {persona.nombre} {persona.apellido}</Text>
        <Text style={styles.textSecundario}>{persona.cedula}</Text>
      </View>
      <View style={styles.itemBotones}>
        <Button
          title=' E '
          color='olivedrab'
          onPress={() => {
            setTxtCedula(persona.cedula)
            setTxtNombre(persona.nombre)
            setTxtApellido(persona.apellido)
            esNuevo = false
            indiceSeleccionado = indice
          }}
        />
        <Button
          title=' X '
          onPress={()=>{
            indiceSeleccionado=indice
            personas.splice(indiceSeleccionado,1)
            //console.log("ARREGLO PERSONAS", personas)
            setNumElementos(personas.length)   
          }}
        />
      </View>
    </View>
    );
  }


  let limpiar = () => {
    setTxtCedula(null);
    setTxtNombre(null);
    setTxtApellido(null);
    esNuevo=true;
  }

  let existePersona=()=>{
    for(let i=0; i<personas.length;i++){
      if(personas[i].cedula == txtCedula){
        return true;
      }
    }
    return false;
  }

  let guardarPersona = () => {
    if (esNuevo) {
      if(existePersona()){
        Alert.alert("INFO", "Ya existe una persona con la cédula: " + txtCedula);
      }else{
      let persona = { nombre: txtNombre, apellido: txtApellido, cedula: txtCedula }
      personas.push(persona);}
      }else {
      personas[indiceSeleccionado].nombre=txtNombre;
      personas[indiceSeleccionado].apellido=txtApellido;
    }
    limpiar();
    setNumElementos(personas.length)   
  }

  return (
    <View style={styles.container}>
      <View style={styles.areaCabeceza}>
        <Text>PERSONAS
          
        </Text>
        <TextInput style={styles.txt}
          value={txtCedula}
          placeholder='Ingrese su cedula'
          onChangeText={setTxtCedula}
          keyboardType='numeric'
          editable={esNuevo}
        />
        <TextInput style={styles.txt}
          value={txtNombre}
          placeholder='Ingrese su nombre'
          onChangeText={setTxtNombre}
        />
        <TextInput style={styles.txt}
          value={txtApellido}
          placeholder='Ingrese su apellido'
          onChangeText={setTxtApellido}
        />
        <View style={styles.areaBotones}>
          <Button
            title='Guardar'
            onPress={() => {
              guardarPersona();
            }}
          />
          <Button
            title='Nuevo'
            onPress={() => {
              limpiar();
            }}
          />
        </View>
        <Text>
          Elementos: {numElementos} </Text>
      </View>



      <View style={styles.areaContenido}>
        <FlatList
          style={styles.lista}
          data={personas}
          renderItem={({index,item}) => {
            return <ItemPersona indice={index} persona={item} />
          }}
          keyExtractor={item => item.cedula
          }
        />
      </View>

      <View style={styles.areaPie}>
        <Text>
          Autor: Marlon Lalangui
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'lightblue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
    paddingTop: 20
  },
  lista: {
    //backgroundColor: "lightpink",
  },
  itemPersona: {
    backgroundColor: 'lightgoldenrodyellow',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row'
  },
  textPrincipal: {
    fontSize: 20,
  },
  textSecundario: {
    fontStyle: "italic",
    fontSize: 16
  },
  areaCabeceza: {
    flex: 4,
    //backgroundColor: 'goldenrod',
    justifyContent: 'center'
  },
  areaContenido: {
    flex: 6,
    //backgroundColor: 'khaki',
  },
  areaPie: {
    flex: 1,
    //backgroundColor: 'lightseagreen',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5
  },
  itemIdice: {
    //backgroundColor: 'lightgrey',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContenido: {
    //backgroundColor: 'mediumpurple',
    paddingLeft: 5,
    flex: 9,
  },
  txt: {
    borderWidth: 1,
    //borderBottomColor: 'gray',
    padding: 5,
    marginBottom: 5
  },
  areaBotones: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  itemBotones: {
    flexDirection: 'row',
    //backgroundColor: 'black',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});
