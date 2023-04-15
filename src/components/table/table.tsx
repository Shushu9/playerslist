import { useEffect, useState, useCallback, useMemo } from "react";
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';


const Table = () => {

    const [data, setData] = useState([]);
    const [multipleTables, setMultipleTables] = useState(false);

    //******** получение данных для будущей таблицы */
    useEffect(() => {
        fetch(`./participants.json`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    //******** выбор количества таблиц для рендера */
    useMemo(() => {
        console.log('settingTableCount');
        setMultipleTables(() => (data.length > 40 && window.innerWidth >= 1200) ? true : false);
    }, [data]);

    //******** названия классов для стилизации */
    const { tableWrapper, tdCenter, tbl, tdName, tdHeader, participants } = tableStyles();



    // ******* Создает будущую таблицу
    const makeTable = useCallback((data, initNumber, lastNumber) => {
        console.log('makeTable');

        // ******* Создает строки для будущей таблицы (всё, что мы поместим в tbody)
        let pairNumber = initNumber === 0 ? 1 : (initNumber / 2) + 1;
        let content = [];

        for (let i = initNumber; i < lastNumber; i = i + 2) {
            content.push(
                <tr key={pairNumber - 1} className={participants}>
                    <td className={tdCenter}>{pairNumber}</td>
                    <td className={tdName}>{data[i].name}</td>
                    <td className={tdCenter}>{data[i].rating}</td>
                    <td className={tdCenter}>0</td>
                    <td className={tdCenter}>0 - 0</td>
                    <td className={tdCenter}>0</td>
                    <td className={tdName}>{data[i + 1].name}</td>
                    <td className={tdCenter}>{data[i + 1].rating}</td>
                </tr>
            );
            pairNumber++;
        }

        // ******* Создает шапку и обертку для будущей таблицы (thead и пустой tbody)
        const table = (
            <table className={tbl}>
                <thead>
                    <tr className={tdHeader}>
                        <td className={tdCenter} >№</td>
                        <td className={tdName}>Имя</td>
                        <td className={tdCenter}>Рейт</td>
                        <td className={tdCenter}>Очки</td>
                        <td className={tdCenter}>Результат</td>
                        <td className={tdCenter}>Очки</td>
                        <td className={tdName}>Имя</td>
                        <td className={tdCenter}>Рейт</td>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        );


        return (
            <>
                {table}
            </>

        )
    }, [tdCenter, tbl, tdName, tdHeader, participants]);


    return (
        <div className={tableWrapper}>
            {multipleTables ? makeTable(data, 0, Math.ceil(data.length / 2)) : makeTable(data, 0, data.length - 1)}
            {multipleTables ? makeTable(data, Math.ceil(data.length / 2) + 1, data.length - 1) : null}
        </div>
    )
}




const tableStyles = makeStyles((theme: Theme) => createStyles({
    tableWrapper: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: '0.8em',
        display: 'flex',
        justifyContent: 'space-around',
        height: 'calc(100vh - 60px)',
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.6em',
        },
    },

    tbl: {
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
            [theme.breakpoints.down('xs')]: {
                padding: '10px 5px',
            },
        },

        '& td:first-child': {
            borderTopLeftRadius: '5px',
        },

        '& td:last-child': {
            borderTopRightRadius: '5px',
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
}));



export default Table;
