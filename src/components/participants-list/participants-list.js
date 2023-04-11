import { useEffect, useState } from "react";
// import * as React from 'react';
// import { styled } from '@mui/styles';
// import './participants-list.css';
import { makeStyles } from '@material-ui/styles';









const ParticipantsList = () => {

    const [data, setData] = useState([]);

    ///******gettind players list  */
    const fetchData = () => {
        fetch(`./participants.json`)
            .then((response) => response.json())
            .then((actualData) => {
                // console.log(actualData);
                setData(actualData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);




    //********classes ********* */

    const classes = styles();


    // ******* condition that chose how much tables should we render
    const makeTwoTables = (data.length > 20 && window.innerWidth >= 1200) ? true : false;


    // ******* creates list of participants pairs
    const makeParticipantsList = (data, initNumber, lastNumber) => {
        let pairNumber = initNumber === 0 ? 1 : (initNumber / 2) + 1;
        let content = [];

        for (let i = initNumber; i < lastNumber; i = i + 2) {
            content.push(
                <tr key={pairNumber - 1} className={classes.participants}>
                    <td className={classes.tdCenter}>{pairNumber}</td>
                    <td className={classes.tdName}>{data[i].name}</td>
                    <td className={classes.tdCenter}>{data[i].rating}</td>
                    <td className={classes.tdCenter}>0</td>
                    <td className={classes.tdCenter}>0 - 0</td>
                    <td className={classes.tdCenter}>0</td>
                    <td className={classes.tdName}>{data[i + 1].name}</td>
                    <td className={classes.tdCenter}>{data[i + 1].rating}</td>
                </tr>
            );
            pairNumber++;
        }
        return content;
    };


    // ******* creates header of participants table
    const makeTableHead = (data, initNumber, lastNumber) => {
        const table = (
            <table className={classes.table}>
                <thead>
                    <tr className={classes.tdHeader}>
                        <td className={classes.tdCenter} >№</td>
                        <td className={classes.tdName}>Имя</td>
                        <td className={classes.tdCenter}>Рейт</td>
                        <td className={classes.tdCenter}>Очки</td>
                        <td className={classes.tdCenter}>Результат</td>
                        <td className={classes.tdCenter}>Очки</td>
                        <td className={classes.tdName}>Имя</td>
                        <td className={classes.tdCenter} nter>Рейт</td>
                    </tr>
                </thead>
                <tbody>
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
        <div className={classes.tableWrapper}>
            {makeTwoTables ? makeTableHead(data, 0, Math.ceil(data.length / 2)) : makeTableHead(data, 0, data.length - 1)}
            {makeTwoTables ? makeTableHead(data, Math.ceil(data.length / 2) + 1, data.length - 1) : null}
        </div>
    )
}

export default ParticipantsList;



const styles = makeStyles({
    tableWrapper: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: '400',
        fontSize: '0.8em',
        display: 'flex',
        justifyContent: 'space-around',
        height: 'calc(100vh - 60px)',
    },
    '@media (max-width: 560px)': {
        tableWrapper: {
            fontSize: '0.6em',
        }
    },
    table: {
        margin: '5px',
        borderSpacing: '0',
        borderRadius: '5px',
        border: '1px solid rgba(224, 224, 224, 1)',
    },
    tdCenter: {
        textAlign: 'center',
    },
    tdName: {
        maxWidth: '175px',
    },

    tdHeader: {
        '& td': {
            padding: '10px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 1)',
        },

        '& td:first-child': {
            borderTopLeftRadius: '5px',
        },

        '& td:last-child': {
            borderTopRightRadius: '5px',
        }
    },

    '@media (max-width: 600px)': {
        tdHeader: {
            '& td': {
                padding: '10px 5px',
            }
        }

    },

    participants: {
        '& td': {
            padding: '10px',
            borderTop: '1px solid rgba(224, 224, 224, 1)',
        },
        '&:nth-child(odd)': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }
    },

});
