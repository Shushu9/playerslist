import { useEffect, useState } from "react";
import './participants-list.css';


const ParticipantsList = () => {

    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`./participants.json`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ******* condition that chose how much tables should we render
    const makeTwoTables = (data.length > 50 && window.innerWidth >= 1200) ? true : false;


    // ******* creates list of participants pairs
    const makeParticipantsList = (data, initNumber, lastNumber) => {
        let pairNumber = initNumber === 0 ? 1 : (initNumber / 2) + 1;
        let content = [];

        for (let i = initNumber; i < lastNumber; i = i + 2) {
            content.push(
                <tr key={pairNumber - 1} className="table__participants">
                    <td className="table__center">{pairNumber}</td>
                    <td className="table__name">{data[i].name}</td>
                    <td className="table__center">{data[i].rating}</td>
                    <td className="table__center">0</td>
                    <td className="table__center">0 - 0</td>
                    <td className="table__center">0</td>
                    <td className="table__name">{data[i + 1].name}</td>
                    <td className="table__center">{data[i + 1].rating}</td>
                </tr>
            );
            pairNumber++;
        }
        return content;
    };


    // ******* creates header of participants table
    const makeTableHead = (data, initNumber, lastNumber) => {

        const table = (
            <table className="table">
                <thead className="table__header">
                    <tr>
                        <td className="table__center">№</td>
                        <td className="table__name">Имя</td>
                        <td className="table__center">Рейт</td>
                        <td className="table__center">Очки</td>
                        <td className="table__center">Результат</td>
                        <td className="table__center">Очки</td>
                        <td className="table__name">Имя</td>
                        <td className="table__center">Рейт</td>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {makeParticipantsList(data, initNumber, lastNumber)}
                </tbody>
            </table>
        );

        return (
            <>
                {table}
            </>

        )
    }

    return (
        <div className="pairs">
            {makeTwoTables ? makeTableHead(data, 0, Math.ceil(data.length / 2)) : makeTableHead(data, 0, data.length - 1)}
            {makeTwoTables ? makeTableHead(data, Math.ceil(data.length / 2) + 1, data.length - 1) : null}
        </div>
    )
}

export default ParticipantsList;


