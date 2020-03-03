import React, {FunctionComponent} from "react";
import {Stasjon, Stasjoner} from "../../types/types";
import './stasjonstabell.css';

const Stasjonstabell: FunctionComponent<{ stasjoner: Stasjoner }> = props => {
    return (
        <table className="stasjonstabell" cellPadding="0" cellSpacing="0">
            <thead>
            <tr>
                <th className="stasjonstabell__th">Stativ</th>
                <th className="stasjonstabell__th">Tilgjengelige sykler</th>
            </tr>
            </thead>
            <tbody className="stasjonstabell__tbody">
            {
                props.stasjoner.map((stasjon: Stasjon) => {
                    return <tr key={stasjon.station_id}>
                        <th>{stasjon.address}</th>
                        <td>{stasjon.capacity}</td>
                    </tr>
                })
            }
            </tbody>
        </table>
    )
}

export default Stasjonstabell;
