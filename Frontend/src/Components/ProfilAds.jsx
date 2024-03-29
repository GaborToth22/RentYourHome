import React, { useEffect } from "react";

function ProfileAds({ appliedads, ads, isAdmin, setApprovedAds, setUnApprovedAds, setLoggedUser, loggedUser, username, fetchApplied }) {

    useEffect(() => {
        fetchApplied();
    }, [loggedUser]);

    const fetchUser = async () => {
        try {
            const res = await fetch(`/api/users/${loggedUser.username}`);
            const data = await res.json();
            setLoggedUser(data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    const handleCancelApply = async adId => {
        try {
            const res = await fetch(`/api/useradapplication/cancel/${adId}&${loggedUser.id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                await fetchUser();
            }
            else {
                console.error(`Error cancel apply.`);
            }
        } catch (error) {
            console.log("Error cancel apply:", error);
        }
    }

    const handleApprove = (id) => {
        fetch(`/api/ads/approve/${id}`, {
            method: 'PUT'
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Ad with ID ${id} has been approved.`);
                    fetch('/api/ads')
                        .then(response => response.json())
                        .then(data => {
                            const unApprovedAds = data.filter(ad => !ad.approved);
                            const approvedAds = data.filter(ad => ad.approved);
                            setUnApprovedAds(unApprovedAds);
                            setApprovedAds(approvedAds);
                        })
                        .catch(error => console.log("Error fetching ads:", error));
                } else {
                    console.error(`Error approving ad with ID ${id}.`);
                }
            })
            .catch(error => {
                console.error(`Error approving ad with ID ${id}:`, error);
            });

    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/ads/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log(`Ad with ID ${id} has been deleted.`);
                if (isAdmin) {
                    const adsResponse = await fetch('/api/ads');
                    const data = await adsResponse.json();
                    const unApprovedAds = data.filter(ad => !ad.approved);
                    const approvedAds = data.filter(ad => ad.approved);
                    setUnApprovedAds(unApprovedAds);
                    setApprovedAds(approvedAds);
                } else {
                    const userResponse = await fetch(`/api/users/${username}`);
                    const userData = await userResponse.json();
                    await setLoggedUser(userData);
                }
            } else {
                console.error(`Error delete ad with ID ${id}.`);
            }
        } catch (error) {
            console.error(`Error delete ad with ID ${id}:`, error);
        }
    };

    return (
        <>
            {isAdmin ? (
                <div className="published-ads">
                    {ads.length > 0 ? (
                        ads.map((ad, index) => (
                            <div key={index} className="card">
                                <div className="image-container">
                                    {ad.images[0] && (
                                        <img src={`/api/images/${ad.images[0]}`} alt="Ad" />
                                    )}
                                </div>
                                <div>Location: {`${ad.address.zipCode}, ${ad.address.city}, ${ad.address.street} ${ad.address.houseNumber}`}</div>
                                <div>Rooms: {ad.rooms}</div>
                                <div>Size: {ad.size} sqm</div>
                                <div>Price: {ad.price} HUF</div>
                                <div>Description: {ad.description}</div>
                                {ad.approved === false && (
                                    <button onClick={() => handleApprove(ad.id)}>Approve</button>
                                )}
                                <br></br>
                                <button onClick={() => handleDelete(ad.id)}>Delete</button>
                                <br></br>
                            </div>
                        ))
                    ) : (
                        <p>No ads to display.</p>
                    )}
                </div>
            ) : (
                <div className="published-ads">
                    {ads.length > 0 ? (
                        ads.map((ad, index) => (
                            <div key={index} className="card">
                                <div className="image-container">
                                    {ad.images[0] && (
                                        <img src={`/api/images/${ad.images[0]}`} alt="Ad" />
                                    )}
                                </div>
                                <div>Location: {`${ad.address.zipCode}, ${ad.address.city}, ${ad.address.street} ${ad.address.houseNumber}`}</div>
                                <div>Rooms: {ad.rooms}</div>
                                <div>Size: {ad.size} sqm</div>
                                <div>Price: {ad.price} HUF</div>
                                <div>Description: {ad.description}</div>
                                {appliedads ? <button onClick={() => handleCancelApply(ad.id)}>Cancel</button> : <button onClick={() => handleDelete(ad.id)}>Delete</button>}
                                <br></br>
                            </div>
                        ))
                    ) : (
                        <p>No ads to display.</p>
                    )}
                </div>
            )}
        </>
    )
}

export default ProfileAds;