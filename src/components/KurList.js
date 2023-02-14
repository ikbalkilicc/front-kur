import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast'
import {useDispatch} from 'react-redux';
import { InputMask } from "primereact/inputmask";
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button'

export const KurList = () =>  {

  const toast = useRef(null)
  const dispatch = useDispatch();
    let emptyManuLogExcel = {
        begin_date: null,
        end_date: null,
        machine_id: null,
        employee_id: null
    

    }
    const [beginDate, setBeginDate] = useState(null);
    const [endDate, setEndDate] = useState(null);



  const leftToolbarTemplate = () => {
    return (
        <React.Fragment>
          <div>
                    <span>
                        <InputMask mask="99-99-9999 99:99" value={beginDate} onComplete={(e) => setBeginDate(e.value)}></InputMask>
                        <label>Başlangıç Tarihi</label>
                    </span>
          </div>


          <div>
                    <span>
                        <Button label="Getir" icon="pi pi-forward" className="p-button-success p-mr-2"  />
                    </span>
          </div>
          <div>
                    <span className="p-float-label">
                        <Button label="Temizle" icon="pi pi-trash" className="p-button-warn"  />
                    </span>
          </div>

        </React.Fragment>
    )
  }

  return (
      <div >
        <Toast ref={toast} />
        <div>
          <div >
            <Toolbar left={leftToolbarTemplate} ></Toolbar>
           <>Hello World</>
          </div>
        </div>
        </div>

  )
}
export default KurList;
