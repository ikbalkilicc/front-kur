import logo from './logo.svg';
import './App.css';
import { Button } from 'primereact/button'
import KurList from '../src/components/KurList';
import React, { useState,useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast'
import { InputMask } from "primereact/inputmask";
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import {useDispatch, useSelector} from 'react-redux';
import ReactDOM from "react-dom";
import axios from "axios";
import moment from "moment";
import Moment from 'moment';
import { clear } from '@testing-library/user-event/dist/clear';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  
  
  
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyDate, setCurrencyDate] = useState(null);
  const toast = useRef(null)
  

  /*useEffect(() => {
      getKurList();
   }, [])*/
  
    
  const clearFilter = () => {
        setCurrencyList([]);
        setCurrencyDate(null);
  }

 
    const getCurrencyList = () => {
      if(currencyDate != null)
     { let parseDate =Moment(currencyDate).format("DD-MM-YYYY");
      axios.get("http://localhost:8080/api/currency/list"+"/"+parseDate)
       /*axios.get("localhost:8080/api/kurGetir"+ "/"+ kurDate)*/
            .then((res) => {
              if(res.data != null)
                {{setCurrencyList(res.data);
                toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kurlar Getirildi' });
                
                }}else
                {
                  toast.current.show({ severity: 'error', summary: 'Hata', detail: 'Kur Listesi Bulunamadı' });
                }
                /*toast.current.show({ severity: 'success', summary: 'Başarılı', detail: 'Kurlar Getirildi' });*/
            }).catch(err => { console.log("hata"); 
            toast.current.show({ severity: 'error', summary: 'Hata', detail: 'Kur Listesi Bulunamadı' });
          });
          }else{
            toast.current.show({ severity: 'warn', summary: 'Hata', detail: 'Zaman Aralığı Seçiniz' });
          }
      
   }
    const leftToolbarTemplate = () => {
        return (
          <React.Fragment>
               <Toast ref={toast} />
          <div className="flex flex-wrap">
                <div className="flex p-0 mt-4 ml-1 mb-0">
                    <span className="float-label">
                        <Calendar value={currencyDate} onChange={(e) => {
                          setCurrencyDate(e.value);
                        }} className="react-calendar" dateFormat="dd-mm-yy"  mask="99-99-9999" />
                        <label>Kur Tarihi</label>
                    </span>
                </div>
            
                
                <div className="flex p-0 mt-4 ml-2 mb-2">
                    <Button label="Getir" icon="pi pi-forward" className="p-button-success" onClick={() => getCurrencyList()} />
                    <Button label="Temizle" icon="pi pi-trash" className="p-button-warn ml-2" onClick={() => clearFilter()} />
                </div>
            </div>
            </React.Fragment>
        )
    }
    return (
        <div className="App">
             <Toast ref={toast} />
            <Toolbar left={leftToolbarTemplate} ></Toolbar>
            <div className="col-12 card">
                    <DataTable value={currencyList} className="p-datatable-row" showGridlines responsiveLayout="scroll" >
                        <Column header="İsim" field="isim"  />
                        <Column header="Birim" field="unit" />
                        <Column header="Döviz Alış" field="forex_buying" />
                        <Column header="Döviz Satış" field="forex_selling"  />
                        <Column header="Efektif Alış" field="banknote_buying"  />
                        <Column header="Efektif Satış" field="bankmote_selling"  />
                    </DataTable>
                </div>

        </div>
    );
}

export default App;
