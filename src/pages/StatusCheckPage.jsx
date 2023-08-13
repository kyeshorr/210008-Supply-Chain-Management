import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Table } from "react-bootstrap";
import { ethers } from "ethers";
import ColorSchemesExample from "../components/Nav";
const StatusCheckPage = () => {
  const [contract, setContract] = useState(null);
  const [itemName, setItemName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
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

  const handleCheckStatus = () => {
    setError("");
    const order = orders.find((order) => order.id._hex === itemName);

    if (order) {
      setStatus(
        order.status === 0
          ? "Created"
          : order.status === 1
          ? "Shipped"
          : "Delivered"
      );
      setName(order.name);
    } else {
      setError("Item not found.");
      setStatus("");
    }
  };

  return (
    <>
      <ColorSchemesExample />
      <Container>
        <center>
          <h1>Check Order Status</h1>
        </center>
        <br />
        <Form>
          <Form.Group controlId="itemName">
            <Form.Label>
              <h3>Order Code</h3>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="EG: 0X00"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="primary" onClick={handleCheckStatus}>
            Check Status
          </Button>
          {status && (
            <div>
              <br />
              <p style={{ textTransform: "capitalize" }}>
                Item Name : <b>{name.toLowerCase()}</b>
              </p>
              <p>
                Status: <b>{status}</b>
              </p>
            </div>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
      </Container>
    </>
  );
};

export default StatusCheckPage;
