import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'; 

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    maxWidth: '800px',
    margin: '0 auto'
  },
  table: {
    width: '100%',
    marginBottom: '20px',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#333',
    color: '#fff'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px'
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '30px',
    zIndex: 1000,
    width: '80%',
    maxWidth: '400px'
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
  },
  formGroup: {
    marginBottom: '20px'
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
};

function AdminPanel() {
  const [busList, setBusList] = useState([]);
  const [form, setForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    fetchBusList();
  }, []);

  const fetchBusList = async () => {
    const busCollection = collection(db, 'listbus');
    const busSnapshot = await getDocs(busCollection);
    const busList = busSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setBusList(busList);
  };

  const handleAddBus = async () => {
    await addDoc(collection(db, 'listbus'), form);
    setForm({});
    setIsAdding(false);
    fetchBusList();
  };

  const handleEditBus = async () => {
    if (!selectedBus) return;
    await updateDoc(doc(db, 'listbus', selectedBus), form);
    setForm({});
    setIsEditing(false);
    setSelectedBus(null);
    fetchBusList();
  };

  const handleDeleteBus = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) return;
    await deleteDoc(doc(db, 'listbus', id));
    fetchBusList();
  };
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

  return (
    <div style={styles.container}>
      <h2>Admin Panel Bus NewShantika</h2>
      {isAdding && (
        <div style={styles.overlay}>
        <div style={styles.modal}> 
          {<form>
            <div style={styles.formGroup}>
          <input name="asal" onChange={handleInputChange} placeholder="Asal Bus" />
          <input name="tujuan" onChange={handleInputChange} placeholder="Tujuan Bus" />
          <input name="jamberangkat" onChange={handleInputChange} placeholder="Jam Berangkat" />
          <input name="jamsampai" onChange={handleInputChange} placeholder="Jam Sampai" />
          <input name="tanggal" onChange={handleInputChange} placeholder="Tanggal" />
          <input name="tipebus" onChange={handleInputChange} placeholder="Tipe Bus" />
          <input name="kodeasal" onChange={handleInputChange} placeholder="Kode Asal" />
          <input name="kodetujuan" onChange={handleInputChange} placeholder="Kode Tujuan" />
          <button type="button" onClick={handleAddBus}>Tambah Bus</button>
          <button type="button" onClick={() => setIsAdding(false)}>Batal</button>
          </div>
        </form>}
          </div>
  </div>
      )}
      {isEditing && (
        <div style={styles.overlay}>
        <div style={styles.modal}>
          {<form>
            <div style={styles.formGroup}>
          <input name="asal" onChange={handleInputChange} value={form.asal || ''} placeholder="Asal Bus" />
          <input name="tujuan" onChange={handleInputChange} value={form.tujuan || ''} placeholder="Tujuan Bus" />
          <input name="jamberangkat" onChange={handleInputChange} value={form.jamberangkat || ''} placeholder="Jam Berangkat" />
          <input name="jamsampai" onChange={handleInputChange} value={form.jamsampai || ''} placeholder="Jam Sampai" />
          <input name="tanggal" onChange={handleInputChange} value={form.tanggal || ''} placeholder="Tanggal" />
          <input name="tipebus" onChange={handleInputChange} value={form.tipebus || ''} placeholder="Tipe Bus" />
          <input name="kodeasal" onChange={handleInputChange} value={form.kodeasal || ''} placeholder="Kode Asal" />
          <input name="kodetujuan" onChange={handleInputChange} value={form.kodetujuan || ''} placeholder="Kode Tujuan" />
          <button type="button" onClick={handleEditBus}>Edit Bus</button>
          <button type="button" onClick={() => setIsEditing(false)}>Batal</button>
          </div>
        </form>}
          </div>
  </div>
      )}
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th>Asal Bus</th>
            <th>Tujuan Bus</th>
            <th>Jam Berangkat</th>
            <th>Jam Sampai</th>
            <th>Tanggal</th>
            <th>Tipe Bus</th>
            <th>Kode Asal</th>
            <th>Kode Tujuan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {busList.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.asal}</td>
              <td>{bus.tujuan}</td>
              <td>{bus.jamberangkat}</td>
              <td>{bus.jamsampai}</td>
              <td>{bus.tanggal}</td>
              <td>{bus.tipebus}</td>
              <td>{bus.kodeasal}</td>
              <td>{bus.kodetujuan}</td>
              <td>
                <button style={{ ...styles.button, backgroundColor: '#ffc107' }} onClick={() => {
                  setIsEditing(true);
                  setForm(bus);
                  setSelectedBus(bus.id);
                }}>Edit</button>
                <button style={{ ...styles.button, backgroundColor: '#dc3545' }} onClick={() => handleDeleteBus(bus.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={styles.button} onClick={() => setIsAdding(true)}>Tambah Bus</button>
    </div>
  );
}

export default AdminPanel;
