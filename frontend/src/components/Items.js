import Swal from 'sweetalert2'
import axios from 'axios';
import Fade from 'react-reveal/Fade';

import { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from "./Navbar";

const Items = () => {
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [allItem, setAllItem] = useState([]);

    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then((response) => {
                //console.log(response.data);
                setAllItem(response.data);
            })
            .catch((error) => {
                console.log('Error from get items', error);
            });
    }, []);

    //*************** SEARCHING CODE **************/

      const lowercasedFilter = filter.toLowerCase();
      
      const filteredData = allItem.filter(item => {
        if(
          (item['item_name'] && item['item_name'].toLowerCase().includes(lowercasedFilter))
        ) {
          return true;
        } else { return false; }        
      });
    //*************** SEARCHING CODE END **************/

    const insertItem = async (e) => {
        e.preventDefault();

        try {
            const resp = await axios.post('http://localhost:5000/items', {
                txtItem: item,
                txtPrice: price,
                txtPresent: true
            });
            console.log(resp.data);
            setAllItem([...allItem, { _id: resp.data._id, item_name: resp.data.item_name, price: resp.data.price }]);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your item has been saved',
                showConfirmButton: false,
                timer: 1500
            });
            e.target.reset();
            //document.getElementById("create-course-form").reset();
        } catch (e) {
            console.log('Error occured from save item', e);
        }
    }
   

    return (
        <div>
            <Navbar />
            <div className="container">
                <br /><br />
                <h4>Add New Item</h4>

                <form className="row g-3" onSubmit={insertItem}>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Item Name</label>
                        <input type="text" className="form-control" onChange={(e) => setItem(e.target.value)} id="inputEmail4" placeholder="New Item" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">Item Price</label>
                        <input type="number" className="form-control" onChange={(e) => setPrice(e.target.value)} id="inputPassword4" placeholder="Price" />
                    </div>                    

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Inser Item</button>
                    </div>
                </form> <br /><br />

                <h4>Search Item</h4>

                <input type="text" value={filter} className="form-control" placeholder="Search item" onChange={(e) => setFilter(e.target.value)} />
                <br /><br />
                <h4>All available Item</h4>

                <Fade>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">S</th>
                            <th scope="col">ID Key </th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Item Price</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((itm, ind) => {
                            return (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{itm._id}</td>
                                    <td>{itm.item_name}</td>
                                    <td>{itm.price}</td>
                                    <td>Edit</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </Fade>
            </div>
            <Footer />
        </div>
    )
}
export default Items;