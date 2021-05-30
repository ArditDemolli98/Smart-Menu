import React, {useEffect, useState} from 'react';

const Home = (props) => {
    const [name, setName] = useState('');

    useEffect( () => {
        (
            async() => {
                const response = await fetch('http://localhost:5000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();
                setName(content.name);
            }
        )();
    })
    return(
        <div>
            {name? 'Hi ' +name : 'You are not logged in'}
        </div>
    );
};

export default Home;