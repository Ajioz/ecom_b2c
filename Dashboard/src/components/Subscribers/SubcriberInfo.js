import React from "react";
import { Link } from "react-router-dom";


const SubcriberInfo = ({subscribers}) => {

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">SN</th>
          <th scope="col">Subscriber ID</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {
          subscribers.map((subscriber, index) => (
            <tr key={subscriber._id}>
                <td>
                  <b>{index+1}</b>
                </td>
                <td><i>{subscriber._id}</i></td>
                <td>{subscriber.email}</td>
                <td className="d-flex justify-content-end align-item-center">
                  <Link to="#" className="text-success">
                    <i className="fas fa-eye"></i>
                  </Link>
                </td>
              </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default SubcriberInfo;
