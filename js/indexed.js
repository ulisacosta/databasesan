'use strict';


const dni = document.querySelector("#inputDNI");
const nameCli = document.querySelector("#inputName");
const lastName = document.querySelector("#inputLastName");

const address = document.querySelector("#inputAddress");
const phone = document.querySelector("#inputPhone");
const email = document.querySelector("#inputEmail");

const compania = document.querySelector("#companies");
const poliza = document.querySelector("#inputPoliza")
const patente = document.querySelector("#inputPatente")


const IDBRequest = indexedDB.open("clientes",1);

IDBRequest.addEventListener("upgradeneeded",()=>{
    let db = IDBRequest.result;
    let cliente = db.createObjectStore("cliente",{
        keyPath:'id',
        autoIncrement: true});
        cliente.createIndex('by_dni','dni',{unique:true});
        cliente.createIndex('by_name','nameCli',{unique:false});
        cliente.createIndex('by_lastName','lastName',{unique:false});
        cliente.createIndex('by_address','address',{unique:false});
        cliente.createIndex('by_phone','phone',{unique:false});
        cliente.createIndex('by_email','email',{unique:false});
        cliente.createIndex('by_compania','compania',{unique:false});
        cliente.createIndex('by_poliza','poliza',{unique:true});
        cliente.createIndex('by_patente','patente',{unique:true});
    })

    IDBRequest.addEventListener("success",()=>{
        console.log("Creado correctamente");
    })
    
    IDBRequest.addEventListener("error",()=>{
        console.log("Ocurrió un error");
    })


    const addObjetos = () =>{
    
        const db=IDBRequest.result;
        const IDBTransaction = db.transaction(["cliente"],"readwrite");
        const objectStore = IDBTransaction.objectStore("cliente");

    
        objectStore.add({
            dni: dni.value,
            nameCli: nameCli.value,
            lastName: lastName.value,
            address: address.value,
            phone: phone.value,
            email: email.value,
            compania:compania.value,
            poliza:poliza.value,
            patente: patente.value
        });


        IDBTransaction.addEventListener("complete",()=>{
        dni.value = '';
        nameCli.value = '';
        lastName.value = '';
        address.value = '';
        phone.value = '';
        email.value = '';
        poliza.value='';
        patente.value='';
        
        document.getElementById('carga').innerHTML='El cliente se cargó correctamente';})
    
    
    IDBTransaction.addEventListener("error",()=>{
        document.getElementById('carga').innerHTML='El cliente no se cargó correctamente';})

    }

    document.getElementById('btnCargar').addEventListener("click",(e)=>{
        e.preventDefault();

        addObjetos();
        
    });

    const getIDBData = (mode,msg) => {
        const db = IDBRequest.result;
        const IDBtransaction = db.transaction ("clientes",mode);
        const objectStore = IDBtransaction.objectStore("clientes");
        IDBtransaction.addEventListener("complete",()=>{
            console.log(msg)
        })
        return objectStore;
    }

    const leerObjeto = () =>{
    
        const IDBData = getIDBData("readonly");
        const cursor = IDBData.openCursor();
        const dniConsulta = document.getElementById('inputDniConsulta').value;
        
            cursor.addEventListener("success", ()=>{
            if(cursor.result === dniConsulta){
                let valorCursor=cursor.result.key;
               
                let test=document.getElementById('rowDni');
                test.innerHTML=valorCursor.dni;
            }
           })
        }


    document.getElementById('btnConsulta').addEventListener("click",(e)=>{
        leerObjeto();

    })