import { createContext, useState } from 'react'

export const UserContext = createContext(null)

// component to setup context
// any component included in this component will be re-rendered
export default ({ children }) => {
    const [user, setUser] = useState(null) // { 'Jim': 'ole' }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

// στο strapi-crash εχω κάνει πιο απλό implenentation!
