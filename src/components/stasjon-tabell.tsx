import React, {FunctionComponent} from "react";
import {Stasjon, Stasjoner} from "../types/types";

const Stasjontabell: FunctionComponent<{ stasjoner: Stasjoner }> = props => {
    return (
        <table>
            <thead>
            <tr>
                <th>Stativ</th>
                <th>Tilgjengelige sykler</th>
            </tr>
            </thead>
            <tbody>
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

export default Stasjontabell;
