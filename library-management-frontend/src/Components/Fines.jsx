export default function Fines(){
    return (
    <>
    <h1>Fine Penalties</h1>
   <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">User</th>        
        <th scope="col">Amount</th>
        <th scope="col">Bio</th>
        <th scope="col">Fine Status</th>
        <th scope="col">Fine Issue Date</th>
        <th scope="col">Payment Date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>
          <button className="btn btn-primary">Pay Fine</button>
        </td>
      </tr>
    </tbody>
  </table>
    </>
  );
}