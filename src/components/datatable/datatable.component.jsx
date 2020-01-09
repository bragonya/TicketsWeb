import React from 'react';
import DataTable from 'react-data-table-component';

import './datatable.styles.scss';

const SampleExpandedComponent = ({ data }) => (
    <div className='div-expanded-row-report'>
      <p>
        {`Nombre: ${data.name}`}
        <br/>
        {`Numero Boleta: ${data.no_document}`}
        <br/>
        {`Carnet/Colegiado: ${data.register_number}`}
        <br/>
        {`Universidad: ${data.university}`}
      </p>
      
    </div>
  );
  
const FilterComponent = ({ filterText, onFilter, onClear, name, placeholder }) => (
  <>
    <input className='TextFieldStyle' id="search" name={name}  type="text" placeholder={placeholder} value={filterText} onChange={onFilter} />
    <button className='ClearButtonStyle etPcIV' name={name} onClick={onClear}>X</button>
  </>
);

const Export = ({ onExport }) => (
    <>
    <button className='etPcIV' onClick={e => onExport(e.target.value)}>Descargar Excel</button>
    </>
);

const columns = [
  {
    name: 'Fila',
    selector: 'fila',
    sortable: true,
  },
  {
    name: 'Columna',
    selector: 'columna',
    sortable: true,
  },
  {
    name: 'Curso',
    selector: 'curso',
    sortable: true,
  },
  {
    name: 'Seccion',
    selector: 'seccion',
    sortable: true,
  },
];

const customStyles = {
    headCells: {
      style: {
        fontSize   : '18px',
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    }
  };

function downloadCSV(array,data) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array,data);
    if (csv == null) return;
  
    const filename = 'export.csv';
  
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
  
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}

function convertArrayOfObjectsToCSV(array,data) {
    let result;
  
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);
  
    result = '';
    result += keys.join(columnDelimiter);
    result = result.replace('name','nombre');
    result = result.replace('register_number','carnet_colegiado');
    result = result.replace('university','universidad');
    result = result.replace('no_document','boleta');
    result += lineDelimiter;
  
    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;
  
        result += item[key];
        
        ctr++;
      });
      result += lineDelimiter;
    });
  
    return result;
}
  


let initialStateFilter={
  filterTextByColumn : '',
  filterTextByRow : '',
  filterTextBySection : '',
  filterTextByCourse : '',
  filterTextByName : ''
};  
const BasicTable = ({seats_solds}) => {
  const [filterTexts, setFilterTexts] = React.useState({
    ...initialStateFilter
  });
  
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const actionsMemo = <Export onExport={() => downloadCSV(seats_solds, seats_solds)} />;
  const filteredItems = seats_solds.filter(
      item => 
        item.seccion.toUpperCase().includes(filterTexts.filterTextBySection.toUpperCase())  &&
        item.curso.toUpperCase().includes(filterTexts.filterTextByCourse.toUpperCase()) &&
        item.fila.toUpperCase().includes(filterTexts.filterTextByRow.toUpperCase()) &&
        item.columna.toString().toUpperCase().includes(filterTexts.filterTextByColumn.toUpperCase()) &&
        item.name.toString().toUpperCase().includes(filterTexts.filterTextByName.toUpperCase())
    );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = (event) => {
      if (filterTexts[event.target.name]) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterTexts({
          ...filterTexts,
          [event.target.name]: ''
        });
      }
    };

    return (
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-auto'>
                  <div className='row main-filter-datatable'>
                    <FilterComponent 
                      name ={`filterTextByName`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por nombre`} 
                      filterText={filterTexts.filterTextByName} 
                    />
                  </div>
                </div>  
              </div>
              <div className='row justify-content-between'>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextByRow`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por fila`} 
                      filterText={filterTexts.filterTextByRow} 
                    />
                  </div>
                </div>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextByColumn`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por columna`} 
                      filterText={filterTexts.filterTextByColumn} 
                    />
                  </div>
                </div>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextByCourse`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por curso`} 
                      filterText={filterTexts.filterTextByCourse} 
                    />
                  </div>
                </div>
                <div className='col-auto'>
                  <div className='row'>
                    <FilterComponent 
                      name ={`filterTextBySection`}  
                      onFilter={e => setFilterTexts({...filterTexts,[e.target.name]:e.target.value})} 
                      onClear={handleClear}
                      placeholder={`filtrar por seccion`} 
                      filterText={filterTexts.filterTextBySection} 
                    />
                  </div>
                </div>
            </div>
          </div>
            );
  }, [filterTexts, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      persistTableHead
      actions={actionsMemo}
      customStyles={customStyles}
      expandableRows
      expandableRowsComponent={<SampleExpandedComponent data={seats_solds} />}


    /> 
  );
  
  
  
};
export default BasicTable;