function UserCard({ name, email, avatar }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "15px", border: "1px solid #e1e8ed", padding: "12px", borderRadius: "8px", background: "#fcfcfc", marginBottom: "10px" }}>
            <img src={avatar} alt={name} style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
            <div>
                <h4 style={{ margin: "0 0 5px 0", color: "#2c3e50" }}>{name}</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "gray" }}>✉️ {email}</p>
            </div>
        </div>
    );
}
export default UserCard;