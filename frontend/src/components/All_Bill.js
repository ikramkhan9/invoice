import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import { jsPDF } from "jspdf";
//import html2canvas from 'html2canvas';
import moment from 'moment';
import Fade from 'react-reveal/Fade';
import { FaClipboardList } from "react-icons/fa";

import Navbar from "./Navbar";

const All_Bill = () => {

    const [allBill, setAllBill] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/bill')
            .then((response) => {
                //console.log(response.data);
                setAllBill(response.data);
            })
            .catch((error) => {
                console.log('Error from all bills', error);
            });
    }, []);

    return (
        <Fragment>
            <Navbar />
            <div className="container">
                <br /><br /><br />
                <h4 className="text-primary">All Invoices Detail</h4>
                <p>All invoices available with complete details</p>

                <Fade>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">S#</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Bill No</th>
                            <th scope="col">Bill Date</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Bill Amount</th>
                            <th scope="col">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBill.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.client_name}</td>
                                    <td>{item.bill_no}</td>
                                    <td>{moment(item.bill_date).format('DD-MM-YYYY')}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.sum}</td>
                                    <td><Link to={`/bill_detail/${item._id}`}><FaClipboardList color="green" /></Link></td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                </Fade>
            </div>

        </Fragment>

    )
}

export default All_Bill;