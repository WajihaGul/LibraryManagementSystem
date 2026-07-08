export default function Authors(){
    return (
    <>
    <h1>Authors</h1>
   <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Bio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>
          <button className="btn btn-primary">View Books</button>
        </td>
      </tr>
    </tbody>
  </table>
    </>
  );
}