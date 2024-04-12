'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useModalContext } from "@/app/context/modal/modalContext";

export default function Front() {

    
    const [newUser, setNewUser] = useState({firstName: '', lastName: '', email: ''});
    const [users, setUsers] = useState([{id: '', firstName: '', lastName: '', email: '', blogsub: false}]);
    const [editingUser, setEditingUser] = useState({id: '', firstName: '', lastName: '', email: '', blogsub: false});
    const { showEditUser, setShowEditUser, setUserToEdit } = useModalContext();
    const router = useRouter();
    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => {
                const usersToSet = data.map((user: any) => {
                    return {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, blogsub: user.blogsub}
                })
                console.log(usersToSet)
                setUsers(usersToSet)
            })
    }, [])
    const saveNewUser = () => {
        fetch('/api', {
            method: 'POST',
            body: JSON.stringify(newUser)
        })
    }

    const handleEdit = () => {
        fetch(`/api`, {
            method: 'PUT',
            body: JSON.stringify({id: editingUser.id, blogSub: editingUser.blogsub, firstName: editingUser.firstName, lastName: editingUser.lastName, email: editingUser.email})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setEditingUser(prevState => ({...prevState, ...data}))
                router.refresh()
            })
    }

    const handleEditThis = () => {
        //console.log(editingUser)
        //setUserToEdit(editingUser)
        //setShowEditUser(true)
    }

    return (
        <>
        <div>
            <input value={newUser.firstName} onChange={(e) => setNewUser(prevState => ({ ...prevState, firstName: e.target.value }))} placeholder="first name" />
            <input value={newUser.lastName} onChange={(e) => setNewUser(prevState => ({ ...prevState, lastName: e.target.value }))} placeholder="last name" />
            <input value={newUser.email} onChange={(e) => setNewUser(prevState => ({ ...prevState, email: e.target.value }))} placeholder="email" />
            <button onClick={saveNewUser}>Save</button>
        </div>
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.firstName} {user.lastName} - {user.email}
                        <button onClick={() => {
                            setEditingUser({id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, blogsub: user.blogsub})
                        }} className="ml-4 border border-black">Edit {user.firstName}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        <>
        <div className="m-2 space-x-4">
            <input value={editingUser.firstName} onChange={(e) => setEditingUser(prevState => ({ ...prevState, firstName: e.target.value }))} placeholder={editingUser.firstName === '' ? '' : editingUser.firstName} />
            <input value={editingUser.lastName} onChange={(e) => setEditingUser(prevState => ({ ...prevState, lastName: e.target.value }))} placeholder={editingUser.lastName === '' ? '' : editingUser.lastName} />
            <input value={editingUser.email} onChange={(e) => setEditingUser(prevState => ({ ...prevState, email: e.target.value }))} placeholder={editingUser.email === '' ? '' : editingUser.email} />
            <button onClick={handleEdit}>Save</button>
        </div>
        </>
        </>
    )
}