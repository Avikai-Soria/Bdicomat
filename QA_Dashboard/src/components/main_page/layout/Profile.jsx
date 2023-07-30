import UserDisplay from "../../../reusable_component/UserDisplay";

export function Profile({ userData }) {

    return (
        <main>
            <div>
                <div style={{ textAlign: "left" }}>
                    <UserDisplay user={userData}></UserDisplay>
                </div>
            </div>
        </main>
    );
}

export default Profile;