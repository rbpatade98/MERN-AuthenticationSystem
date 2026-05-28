import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

const UserDashboard = () => {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  // Fetch Users
  const fetchUsers = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/api/user?page=${page}&limit=10`
      );

      setUsers(response.data.users);

      setTotalPages(
        response.data.pagination.totalPages
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div style={styles.container}>

      {/* Top Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={styles.label}>
              BMW M USER MANAGEMENT
            </p>

            <h1 style={styles.heading}>
              USER DASHBOARD
            </h1>
          </div>
          
          <button onClick={handleLogout} style={styles.logoutButton}>
            LOGOUT
          </button>
        </div>

        {/* M Stripe */}
        <div style={styles.stripeWrapper}>
          <div style={styles.blueLight}></div>
          <div style={styles.blueDark}></div>
          <div style={styles.red}></div>
        </div>

      </div>

      {/* Top Action Bar */}
      <div style={styles.topBar}>

        {/* <div style={styles.searchBox}>
          <Search size={16} color="#7e7e7e" />

          <input
            type="text"
            placeholder="SEARCH USERS"
            style={styles.input}
          />
        </div> */}

        {/* <div style={styles.statsCard}>
          <span style={styles.statsLabel}>
            TOTAL USERS
          </span>

          <span style={styles.statsValue}>
            {users.length}
          </span>
        </div> */}

      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>

        <table style={styles.table}>

          <thead>

            <tr style={styles.tableHeadRow}>

              <th style={styles.th}>USERNAME</th>

              <th style={styles.th}>EMAIL</th>

              <th style={styles.th}>CREATED</th>

            </tr>

          </thead>

          <tbody>

            {!loading && users.map((user) => (

              <tr
                key={user._id}
                style={styles.tableRow}
              >

                <td style={styles.td}>
                  {user.username}
                </td>

                <td style={styles.td}>
                  {user.email}
                </td>

                <td style={styles.td}>
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

        {/* Loading */}
        {loading && (
          <div style={styles.loading}>
            LOADING USERS...
          </div>
        )}

      </div>

      {/* Pagination */}
      <div style={styles.pagination}>

        {/* Prev */}
        <button
          style={styles.iconButton}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Numbers */}
        {[...Array(totalPages)].map((_, index) => {

          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              style={{
                ...styles.pageButton,

                background:
                  page === pageNumber
                    ? "#ffffff"
                    : "transparent",

                color:
                  page === pageNumber
                    ? "#000000"
                    : "#ffffff",

                border:
                  page === pageNumber
                    ? "1px solid #ffffff"
                    : "1px solid #3c3c3c",
              }}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next */}
        <button
          style={styles.iconButton}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
};

const styles = {

  container: {
    minHeight: "100vh",
    background: "#000000",
    color: "#ffffff",
    padding: "40px",
    fontFamily:
      "Inter, sans-serif",
  },

  header: {
    marginBottom: "40px",
  },

  label: {
    fontSize: "13px",
    letterSpacing: "2px",
    color: "#bbbbbb",
    marginBottom: "10px",
  },

  heading: {
    fontSize: "48px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "1px",
  },

  stripeWrapper: {
    display: "flex",
    marginTop: "20px",
    width: "140px",
    height: "4px",
  },

  blueLight: {
    flex: 1,
    background: "#0066b1",
  },

  blueDark: {
    flex: 1,
    background: "#1c69d4",
  },

  red: {
    flex: 1,
    background: "#e22718",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    gap: "20px",
    flexWrap: "wrap",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#1a1a1a",
    border: "1px solid #3c3c3c",
    padding: "12px 16px",
    width: "320px",
  },

  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#ffffff",
    width: "100%",
    fontSize: "14px",
  },

  statsCard: {
    background: "#1a1a1a",
    border: "1px solid #3c3c3c",
    padding: "14px 20px",
    display: "flex",
    flexDirection: "column",
    minWidth: "160px",
  },

  statsLabel: {
    fontSize: "12px",
    letterSpacing: "1.5px",
    color: "#7e7e7e",
    marginBottom: "6px",
  },

  statsValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
  },

  tableWrapper: {
    border: "1px solid #3c3c3c",
    overflowX: "auto",
    background: "#0d0d0d",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  tableHeadRow: {
    background: "#111111",
  },

  th: {
    textAlign: "left",
    padding: "18px",
    fontSize: "13px",
    letterSpacing: "1.5px",
    color: "#bbbbbb",
    borderBottom: "1px solid #3c3c3c",
  },

  td: {
    padding: "18px",
    borderBottom: "1px solid #262626",
    fontSize: "14px",
    color: "#e6e6e6",
  },

  tableRow: {
    transition: "0.2s",
  },

  loading: {
    padding: "30px",
    textAlign: "center",
    color: "#bbbbbb",
    letterSpacing: "1px",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "30px",
    flexWrap: "wrap",
  },

  pageButton: {
    width: "42px",
    height: "42px",
    background: "transparent",
    border: "1px solid #3c3c3c",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
  },

  iconButton: {
    width: "42px",
    height: "42px",
    borderRadius: "9999px",
    border: "1px solid #3c3c3c",
    background: "#1a1a1a",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  logoutButton: {
    padding: "10px 20px",
    background: "#e22718",
    color: "#ffffff",
    border: "none",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "1px",
    cursor: "pointer",
  },
};

export default UserDashboard;