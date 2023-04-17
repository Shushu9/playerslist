import { useEffect, useState, useCallback } from "react";
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
// import { useEffect, useState, useCallback, useMemo } from "react";
// import { Theme, makeStyles, createStyles, useTheme } from '@material-ui/core/styles';



const Table = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    //******** получение данных для будущей таблицы */
    useEffect(() => {
        fetch(`./participants.json`)
            .then((response) => response.json())
            .then((actualData) => {
                setData(actualData);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    //******** названия классов для стилизации */
    const { tableWrapper, tdCenter, tbl, tdName, tdHeader, participants } = useStyles();


    // ******* Создает нужное количество таблиц
    const makeTables = useCallback(() => {

        // ******* Создает будущую таблицу
        const makeOneTable = (data: Array<any>, initNumber: number, lastNumber: number, key: number) => {

            // ******* Создает строки для будущей таблицы (всё, что мы поместим в tbody)
            let pairNumber = (initNumber === 0) ? 1 : Math.ceil(initNumber / 2) + 1;
            let content = [];

            for (let i = initNumber; i < lastNumber; i = i + 2) {
                content.push(
                    <tr key={pairNumber} className={participants}>
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
                <div key={key}>
                    {table}
                </div>

            )
        };



        const reedableTableWidth = 600; //читабельная ширина таблицы в данном проекте. определяет максимально возможное количество таблиц на странице
        const tableCount = window.innerWidth > reedableTableWidth ? Math.floor(window.innerWidth / reedableTableWidth) : 1;
        let content = [];
        //dataStep всегда четно для нашего случая
        const dataStep = (data.length / tableCount) % 2 === 0 ? data.length / tableCount :
            (Math.ceil(data.length / tableCount) + 1) % 2 === 0 ? Math.ceil(data.length / tableCount) + 1 : Math.ceil(data.length / tableCount) + 2;

        let startCounter = 0;
        let endCounter = dataStep;


        // ******* Создает нужное количество таблиц
        for (let i = 0; i < tableCount; i++) {
            content.push(makeOneTable(data, startCounter, endCounter, i));
            startCounter += dataStep;
            endCounter += dataStep;

            if (data.length - 1 <= startCounter) {
                break //нужно для предотвращения образования пустых таблиц 
            }
            if (endCounter >= data.length) {
                endCounter = data.length - 1;
            }

        }

        return content;
    }, [data, participants, tbl, tdCenter, tdHeader, tdName]);


    const content = makeTables()

    if (isLoading) {
        return null
    }
    return (
        <div className={tableWrapper} >
            {content}
        </div >
    )
}








const useStyles = makeStyles((theme: Theme) => createStyles({
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
