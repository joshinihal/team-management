import classes from "./Table.module.css";

const Table = (props) => {

  const handleDelete = (member) => {
    props.onMemberDelete(member);
  }

  const tableData = props.members.map((member) => {
    return (
      <tr key={member.name}>
        <td>
          <input type="checkbox"></input>
        </td>
        <td>{member.name}</td>
        <td>{member.company}</td>
        <td>{member.status}</td>
        <td>{member.lastUpdated}</td>
        <td>{member.notes}</td>
        <td>
          {" "}
          <button onClick={()=> handleDelete(member)} className="btn red-btn">Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <div className={classes.container}>
      {props.members.length ? <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tableData}
        </tbody>
      </table> : <div>No members found!</div>}
      
    </div>
  );
};

export default Table;
