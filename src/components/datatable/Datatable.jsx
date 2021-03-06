import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from "../../dataTableSource";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";


const Datatable = ({ columns }) => {

    const location = useLocation();

    const path = location.pathname.split("/")[1];

    const [list, setList] = useState([]);

    const { data, loading, error } = useFetch(`/api/${path}`);

    useEffect(() => {
      setList(data);
    }, [data]);
    

    const handleDelete = async (id) => {

        try {
            await axios.delete(`/api/${path}/${id}`); // Wont work for room becos room has different api url

            setList(list.filter(item => item._id !== id));
        } catch (err) {
            
        }
    }
    

    const actionColumn = [
        { 
            field: "action", 
            headerName: "Action", 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
                    </div>
                );
            } 
        }
    ];

    return (
        <div className="datatable">
            <div className="dataTableTitle">
                {path}
                <Link to={`/${path}/new`} className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                rows={list}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                className="datagrid"
                getRowId={row => row._id}
            />
        </div>
    );
}

export default Datatable;