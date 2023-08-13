import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { ethers } from "ethers";
import "../index.css";
import ColorSchemesExample from "../components/Nav";
const TrackOrder = () => {
  const [contract, setContract] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusChangeError, setStatusChangeError] = useState("");
  const [deleverd, setDeleverd] = useState(false);

  useEffect(() => {
    const contractAddress = "0x9596eBF9315A0601db951303e62abA393835BdEa";
    const contractABI = [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        name: "ItemCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "ItemDelivered",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "ItemShipped",
        type: "event",
      },
      {
        inputs: [{ internalType: "string", name: "_name", type: "string" }],
        name: "createItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
        name: "deliverItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "itemCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "items",
        outputs: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "enum SupplyChain.ItemStatus",
            name: "status",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
        name: "shipItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contract);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!contract) return;

      const count = await contract.itemCount();
      const fetchedOrders = [];
      for (let i = 0; i < count; i++) {
        const order = await contract.items(i);
        fetchedOrders.push(order);
      }
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, [contract]);

  const toggleStatus = async (order) => {
    try {
      if (!contract) {
        console.error("Contract not initialized.");
        return;
      }

      if (order.status === 0) {
        // Created -> Shipped
        const tx = await contract.shipItem(order.id);
        await tx.wait();
      } else if (order.status === 1) {
        // Shipped -> Delivered
        const tx = await contract.deliverItem(order.id);
        await tx.wait();
      } else {
        console.error("Invalid status transition.");
        return;
      }

      const updatedOrders = orders.map((existingOrder) =>
        existingOrder.id.toString() === order.id.toString()
          ? { ...existingOrder, status: order.status + 1 }
          : existingOrder
      );

      setOrders(updatedOrders);
    } catch (error) {
      console.log("Error changing order status:", error);
    }
  };

  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1]; // Assuming you're filtering by item name
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  return (
    <>
      <ColorSchemesExample />
      <div>
        <Container>
          <br />
          <div>
            <center>
              <h1>Order History</h1>
            </center>
          </div>
          <br />
          <div className="containerBox">
            <input
              type="text"
              id="myInput"
              onKeyUp={myFunction}
              placeholder="Search for Items"
              title="Type in a name"
            />
            <Table striped bordered hover id="myTable">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Item Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id._hex}>
                    <td>{order.id._hex}</td>
                    <td>{order.name}</td>
                    <td>
                      {order.status === 0
                        ? "Order Placed"
                        : order.status === 1
                        ? "Order Shipped"
                        : "Order Delivered"}
                    </td>
                    <td>
                      {deleverd || order.status === 2 ? (
                        <Button variant="success" disabled>
                          Change Status
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => toggleStatus(order)}
                        >
                          Change Status
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {statusChangeError && <p>{statusChangeError}</p>}
        </Container>
      </div>
    </>
  );
};

export default TrackOrder;
