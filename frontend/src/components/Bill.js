import Swal from 'sweetalert2'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'
import Fade from 'react-reveal/Fade';

import Footer from './Footer';
import Navbar from "./Navbar";

const Bill = () => {
    const [clientName, setClientName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');

    const history = useHistory()

    const [allItem, setAllItem] = useState([]);    
    const [resItem, setResItem] = useState('');
    const [resPrice, setResPrice] = useState('');

    const [billItem, setBillItem] = useState([]);    
    const [totalBills, setTotalBills] = useState('');

    let sum = 0;

    const countBills = () => {
        axios.get('http://localhost:5000/count_bills')
            .then((response) => {
                console.log(response.data);
                setTotalBills(response.data);
            })
            .catch((error) => {
                console.log('Error from total bills: ', error);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then((response) => {
                //console.log(response.data);
                setAllItem(response.data);
                countBills();
            })
            .catch((error) => {
                console.log('Error from get items', error);
            });
    }, []);

    //let { id } = useParams();

    const handleChange = (e) => {
        let id = e.target.value;
        //console.log('line 51 ', id);

        axios.get('http://localhost:5000/one_item/' + id)
            .then((response) => {          
                setResItem(response.data.item_name);
                setResPrice(response.data.price);                
            })
            .catch((error) => {
                console.log('Error from get items', error);
            });
    }

    let final_qty = 0;

    const addItem = (e) => {
        e.preventDefault();
        
        final_qty = document.getElementById("myText").value;
        if (resItem === '') {
            alert('Select any item');
        } else if (final_qty === '') {
            alert('Please enter quantity');
        } else {
            setBillItem([...billItem, { item: resItem, price: resPrice, quantity: final_qty, tPrice: (resPrice * final_qty) }]);
            final_qty = '';
        }        
    }

    const generateInvoice = (e) => {
        e.preventDefault();
        let id = 0;

        axios.post('http://localhost:5000/bill', {
            client_name: clientName,
            mobile: mobile,
            address: address,
            bill_no: (totalBills + 1),
            bill_items: billItem,
            sum: sum,
        })
            .then((response) => {
                console.log(response.data);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your invoice has been generated',
                    showConfirmButton: false,
                    timer: 1500
                });
                id = response.data._id;
                console.log('Bill Id client line 117: ', id);
                history.push(`/bill_detail/${id}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //const printPDF = () => {
    // console.log('test pdf');

    // const divToDisplay = document.getElementById('print_pdf')
    // html2canvas(divToDisplay).then(function (canvas) {
    //     const divImage = canvas.toDataURL("image/png");
    //     const pdf = new jsPDF();
    //     pdf.addImage(divImage, 'PNG', 10, 10);
    //     pdf.save("nikah.pdf");
    // })
    //};

    const removeItem = (itemName) => {
        console.log('remove item', itemName);
        Swal.fire({
            title: 'Do you want delete this item from invoice?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                setBillItem(billItem.filter(items => items.item !== itemName));

                Swal.fire('Item Deleted!', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <br /><br />
                <h4 className="text-primary">Generate Bill</h4>

                <Fade>
                    <form onSubmit={generateInvoice}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Client Name</label>
                                <input type="text" className="form-control" placeholder="Your client name" value={clientName} onChange={(e) => { setClientName(e.target.value) }} />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Mobile</label>
                                <input type="text" className="form-control" value={mobile} onChange={(e) => { setMobile(e.target.value) }} id="exampleFormControlTextarea1" placeholder="Valid mobile number" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} id="exampleFormControlTextarea1" placeholder="Residential Address" />
                        </div>


                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="exampleInputEmail1" className="form-label">Please select item</label>
                                <select defaultValue={"All item"} className="form-select" aria-label="Default select example" onChange={handleChange} >

                                    <option selected value="Please select item">Please select item</option>
                                    {allItem.map((itm, ind) => {
                                        return (
                                            <option key={ind} value={itm._id}>{itm.item_name} - Rs. {itm.price}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="mb-3 col-md-6">
                                <label htmlFor="exampleInputEmail1" className="form-label">Enter Quantity</label>
                                <input className="form-control" placeholder="Item Quantity" id="myText" type="number" />
                            </div>
                        </div>



                        <br />
                        <button type="button" onClick={addItem} className="btn btn-primary">Add Item</button>


                        <br /><br />

                        <h4 className="text-success">Item Bill {billItem.length}</h4>

                        {billItem.length > 0 &&
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col">S#</th>
                                        <th scope="col">Item Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total Price</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {billItem.map((product, ind) => {
                                        return (
                                            <tr key={ind}>
                                                <th scope="row">{ind + 1}</th>
                                                <td>{product.item}</td>
                                                <td>{product.price}</td>
                                                <td>{(product.tPrice / product.price)}</td>
                                                <td>{product.tPrice}</td>
                                                <td><FaTimes onClick={() => removeItem(product.item)} /> <span style={{ color: 'white', visibility: 'hidden' }}> {sum = sum + product.tPrice} </span> </td>
                                            </tr>
                                        )
                                    })}
                                    <tr className="text-success">
                                        <td colSpan="4">&nbsp;</td>
                                        <th>Total Bill Amount</th>
                                        <th>{sum}</th>
                                    </tr>
                                </tbody>
                            </table>
                        }

                        <br />
                        <button type="submit" className="btn btn-danger">Generate Invoice</button>
                    </form>
                </Fade>

                <br /><br />
                <hr />
                <Footer />
            </div>
        </div>
    )
}
export default Bill;

