import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
 
const App = () => {
  // Estados para el nombre del cliente, fecha de reserva, lista de clientes, y visibilidad del modal
  const [nombre, setNombre] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [personaReserva, setPersonaReserva] = useState('');
  const [alumno, setAlumnos] = useState([]);
  const [carnet, setCarnet] = useState([]);
  const [colorFav, setColorfav] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
 
  // Estados para el datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
 
  // Función para cambiar la fecha seleccionada en el datetimepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Si no se selecciona ninguna fecha, se mantiene la actual
    setShow(false); // Oculta el datetimepicker
    setFechaReserva(currentDate); // Establece la fecha de reserva seleccionada en el estado
  };
 
  // Función para mostrar el datetimepicker con el modo especificado (date o time)
  const showMode = (currentMode) => {
    setShow(true); // Muestra el datetimepicker
    setMode(currentMode); // Establece el modo del datetimepicker
  };
 
  // Función para mostrar el datetimepicker en modo fecha
  const showDatepicker = () => {
    showMode('date');
  };
  const [idCounter, setIdCounter] = useState(1);
  // Función para agregar un nuevo cliente
  const agregarAlumno = () => {
    // Genera un nuevo cliente con un ID único (incrementa el último ID generado)
    const nuevoAlumno = { id: idCounter, nombre: nombre, carnet: carnet, colorFav: colorFav, fechaReserva: fechaReserva, persoReserva: personaReserva };
    // Agrega el nuevo cliente a la lista de clientes
    setAlumnos([...alumno, nuevoAlumno]);

    setIdCounter(idCounter + 1);
    // Limpia los campos de entrada
    setNombre('');
    setCarnet('');
    setColorfav('');
    setFechaReserva(new Date());
    setPersonaReserva('');
    // Oculta el modal de agregar cliente
    setModalVisible(false);
  };
 
  // Función para eliminar un cliente
  const eliminarAlumno = (id) => {
    // Filtra la lista de clientes para excluir el cliente con el ID dado
    setAlumnos(alumno.filter((alumno) => alumno.id !== id));
  };
 
  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal de agregar cliente */}
      <Button title="Agregar Alumno" onPress={() => setModalVisible(true)} />
      {/* Modal de agregar cliente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de entrada para el nombre del cliente */}
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Carnet"
              keyboardType='numeric'
              value={carnet}
              onChangeText={setCarnet}
            />
            <TextInput
              style={styles.input}
              placeholder="Materia favorita"
              value={colorFav}
              onChangeText={setColorfav}
            />
            {/* Botón para mostrar el datetimepicker */}
            <TouchableOpacity onPress={showDatepicker}><Text>Seleccionar fecha de nacimiento</Text></TouchableOpacity>
            {/* Muestra la fecha seleccionada */}
            <Text>selected: {fechaReserva.toLocaleString()}</Text>
            {/* Muestra el datetimepicker si la variable show es verdadera */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES' // Establece el idioma del datetimepicker a español
              />
            )}
            {/* Botón para agregar el cliente */}
            <Button title="Agregar Alumno" onPress={agregarAlumno} />
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      {/* Lista de clientes */}
      <FlatList
        data={alumno}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.AlumnoItem}
          >
 
            {/* Muestra el ID, nombre y fecha de reserva del cliente */}
 
            <View style={styles.conte}>
              <Text style={styles.nombreAlumno}>{item.id}</Text>
              <TouchableOpacity
              style={styles.buttonEliminar}
                onPress={() => eliminarAlumno(item.id)}>
                <Text style={styles.nombreAlumno}>X</Text>
              </TouchableOpacity>
            </View>
 
            <Text style={styles.nombreAlumno}>{item.nombre}</Text>
            <Text style={styles.nombreAlumno}>{item.carnet}</Text>
            <Text style={styles.nombreAlumno}>{item.colorFav}</Text>
            <Text style={styles.FechaAlumno}>
              Fecha de nacimiento: {item.fechaReserva.toDateString()}
            </Text>
 
 
          </TouchableOpacity>
 
        )}
        keyExtractor={(item) => item.id.toString()} // Extrae el ID de cada cliente como clave única
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  AlumnoItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5
  },
  nombreAlumno: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  FechaAlumno: {
    fontSize: 16,
  },
  conte: {
    flexDirection: 'row',
  },
  buttonEliminar: {
    marginLeft: 300,
  },
});
 
export default App;