import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import moment from 'moment';
import { FaFilePdf } from "react-icons/fa";

import Navbar from "./Navbar";

const BillDetail = () => {
    let { billId } = useParams();
    let id = billId
    //console.log('line no is: 12 client', id);

    const [finalItem, setFinalItem] = useState([]);
    const [billOne, setBillOne] = useState({});

    let path = 'http://localhost:5000/bill_one/' + id;

    useEffect(() => {
        axios.get(path)
            .then((response) => {
                //console.log(response.data);                
                setBillOne(response.data);
                setFinalItem(response.data.bill_items);
            })
            .catch((error) => {
                console.log('Error from get items', error);
            });
    }, [path]);

    const printPDF = () => {
        console.log('test pdf');

        let doc = new jsPDF('p' ,'pt', 'a4');
        doc.html(document.querySelector('#print_pdf'), {
            callback: (pdf) => {
                //var pageCount = doc.internal.getNumberOfPages();
                //console.log('pageCount', pageCount);                
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                doc.deletePage(2);
                pdf.save('bill_2021.pdf');
            }
        });

        // const divToDisplay = document.getElementById('print_pdf')
        // html2canvas(divToDisplay).then(function (canvas) {
        //     const divImage = canvas.toDataURL("image/png");
        //     const pdf = new jsPDF();
        //     pdf.addImage(divImage, 'PNG', 10, 10);
        //     pdf.save("nikah.pdf");
        // })
    };

    return (
        <Fragment>
            <Navbar />
            <div className="container">
                <div id="print_pdf" style={{padding: '20px', width: '600px', height:"700"}}>
                    <h4 className="text-primary">Chhipa Company</h4>
                    <div>Address: Hosue # 396, Main Road, Karachi - Pakistan</div>
                    <div>Contact: 0300-1234569</div>
                    <hr />

                    <h3 className="text-danger text-center">INVOICE</h3>
                    <div className="row">
                        <div className="col">
                            <h4 className="text-success">{billOne.client_name}</h4>
                            <div>Address: {billOne.address}</div>
                            <div>Contact: {billOne.mobile} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Invoice No. {billOne.bill_no} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Invoice Date: {moment(billOne.bill_date).format('DD-MM-YYYY')}</div>
                            <div>&nbsp;</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col">S#</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalItem.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{item.item}</td>
                                                <td>{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.tPrice}</td>
                                            </tr>
                                        )
                                    })
                                    }

                                    <tr className="text-success">
                                        <td colSpan="3">&nbsp;</td>
                                        <th>Total Bill Amount</th>
                                        <th>{billOne.sum}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p>
                        <strong>Notes: It was great doing business &nbsp; with you. Please make the payment by the due date.</strong>
                    </p>
                </div>

                <button className="btn btn-primary" onClick={printPDF}>Print <FaFilePdf /></button>

            </div>
        </Fragment>
    )
}

export default BillDetail;