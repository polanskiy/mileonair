import React from 'react';
import MaterialTable from 'material-table';
import mockData from './mockData.json';
import expand from '../../images/expand.svg';
import back from '../../images/right.svg';

const UserInfoTable = ({
  activeTable, isLoading, fullTable, setFullTable,
}) => {
  const handleFull = () => {
    setFullTable((oldValue) => !oldValue);
  };
  let columns = [
    {
      title: 'Номер транзакции',
      field: 'transaction',
      widtd: 180,
      render: (rowData) => <div style={{ fontSize: 14, minWidth: 142 }}>{rowData.transaction}</div>,
      cellStyle: {
        padding: 8,
      },
    },
    {
      title: 'Название банка',
      field: 'bank',
      render: (rowData) => <div style={{ fontSize: 14, minWidth: 148 }}>{rowData.bank}</div>,
      cellStyle: {
        padding: 8,
      },
    },
    {
      title: 'Дата прохода',
      field: 'passDate',
      render: (rowData) => <div style={{ fontSize: 14, minWidth: 120 }}>{rowData.passDate}</div>,
      cellStyle: {
        padding: 8,
      },
    },
    {
      title: '',
      field: '',
      widtd: 50,
      render: () => <span>...</span>,
      cellStyle: {
        padding: 8,
      },
    },
  ];

  if (fullTable) {
    const newColumns = [
      {
        title: 'Время транзакции',
        field: 'transactionTime',
        render: (rowData) => <div style={{ fontSize: 14, minWidth: 100, textAlign: 'center' }}>{rowData.transactionTime}</div>,
        cellStyle: {
          padding: 8,
        },
      },
      {
        title: 'Место прохода',
        field: 'passPlace',
        render: (rowData) => <div style={{ fontSize: 14, minWidth: 120 }}>{rowData.passPlace}</div>,
        cellStyle: {
          padding: 8,
        },
      },
    ];
    columns.pop();
    columns = columns.concat(newColumns);
  }

  return (
    <div className="user-info__table" style={{ maxWidth: fullTable ? '100%' : 595, borderColor: fullTable ? 'transparent' : '#B8BCC6', borderRadius: fullTable ? 0 : '16px' }}>
      {isLoading && 'loading'}
      {activeTable && !isLoading
     && (
     <>
       <button className="user-info__control-btn" onClick={handleFull}><img src={fullTable ? back : expand} /></button>
       <p className="user-info__name">{mockData.name}</p>
       <div style={{ maxHeight: fullTable ? 140 : 220, transition: '.5s', overflowY: 'hidden' }}>
         <table className={fullTable ? 'user-info__description-table user-info__description-table_expanded' : 'user-info__description-table'}>
           <tbody>
             <tr>
               <td>Телефон:</td>
               <td>{mockData.phone}</td>
             </tr>
             <tr>
               <td>Банк/тип карты:</td>
               <td>{mockData.cardType}</td>
             </tr>
             <tr>
               <td>Номер договора:</td>
               <td>{mockData.contractNumber}</td>
             </tr>
             <tr>
               <td>Количество проходов:</td>
               <td>{mockData.passNumber}</td>
             </tr>
             <tr>
               <td>
                 Окончание действия договора:
               </td>
               <td>{mockData.contractEnd}</td>
             </tr>
             <tr>
               <td>Статус пользователя:</td>
               <td>{mockData.status}</td>
             </tr>
             <tr>
               <td>UID пользователя:</td>
               <td>{mockData.uid}</td>
             </tr>
           </tbody>
         </table>
       </div>
       <p className="user-info__table-title">Транзакции</p>
       <div className="user-info__table-box" style={{ maxHeight: fullTable ? 260 : 180, overflowY: 'hidden' }}>
         <MaterialTable
           options={{
             search: false,
             paging: false,
             sorting: false,
             headerStyle: {
               fontSize: 14,
               color: '#3D4048',
               fontWeight: 300,
               position: 'sticky',
               top: 0,
             },
             maxBodyHeight: 260,
           }}
           columns={columns}
           data={fullTable ? mockData.rows : mockData.rows.slice(0, 3)}
           title=""
         />
       </div>
     </>
     )}
    </div>
  );
};

export default UserInfoTable;
