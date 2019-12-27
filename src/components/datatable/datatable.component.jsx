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
  
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input className='TextFieldStyle' id="search" type="text" placeholder="filtrar" value={filterText} onChange={onFilter} />
    <button className='ClearButtonStyle etPcIV' onClick={onClear}>X</button>
  </>
);

const Export = ({ onExport }) => (
    <>
    <button className='etPcIV' onClick={e => onExport(e.target.value)}>Export</button>
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
  


  
const BasicTable = ({seats_solds}) => {
  const [filterText, setFilterText] = React.useState('');
  
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const actionsMemo = <Export onExport={() => downloadCSV(seats_solds, seats_solds)} />;
  const filteredItems = seats_solds.filter(
      item => 
        item.seccion.toUpperCase().includes(filterText.toUpperCase())  ||
        item.curso.toUpperCase().includes(filterText.toUpperCase()) ||
        item.fila.toUpperCase().includes(filterText.toUpperCase())
        );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);

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