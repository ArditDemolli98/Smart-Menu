import React from 'react';
import { QRCode } from "react-qr-svg";
import { accountService } from '@/_services';

function Home() {
    const user = accountService.userValue;
    const userid = accountService.userValue.id;
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {user.firstName}!</h1>
                <p>Welcome to Smart-Menu</p>
                <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 128 }}
                    value={"http://localhost:8080/showmenu/" + userid}
                />
            </div>
        </div>
    );
}

export { Home };