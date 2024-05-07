import { StyleSheet } from 'react-native';

export default StyleSheet.create({

 
  minviewaudioacall: {
    width: '100%',
    height: 'auto',
    paddingLeft: 15,
    paddingRight: 15,
  },
  setheaderspacepadding: {
    height: 60,
    backgroundColor: 'red',
    paddingTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,

  },
  modalView: {
    backgroundColor: 'red',
    borderRadius: 7,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 20,
    paddingBottom: 20,
    width: '95%'
  },
  setbgcolorgrsay: {
    backgroundColor: 'red',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    opacity: Platform.OS === 'ios' ? 2 : 0.9,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  closeIcon: {
    position: 'absolute',
    right: 15,
    top: 16,
    height: 40,
    width: 40,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  iconclosestyle: {
    color: 'red',
    paddingBottom: 3,
  },
  checkiconright: {
    borderWidth: 3,
    height: 80,
    width: 80,
    borderRadius: 100,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  },
  setroundcenter: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  setbackgroundicon: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
  },
  registertextset: {
    paddingTop: 25,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settext: {
    color: 'red',
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  setokbutton: {
    width: '40%',
  },
  setokbuttontwo: {
    width: '48%',
  },
  buttonminview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal:'5%',
    paddingTop: 20,
  },
  buttonminviewdettwo: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal:'5%',
    paddingTop: 20,
  },
  setbuttonstyle: {
    backgroundColor: 'red',
    width: '50%'
  },
  
  setalldetailesminview: {
    paddingTop: 70,
  },
  setbgimage: {
    height: '100%',
    width: '100%',
  },
  container: {
    height: '100%'
  },
  setbuttontextstyle: {
    color: 'white',
  },
  setbuttonstyletwo: {
    height: 55,
  },
  icomvlose: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 10,
    right: 30,
  },
  margintop: {
    marginTop:10,
  },
  buttoncolorwhite: {
    backgroundColor:'transperent',
    shadowOpacity: 0
  },
 
 
});