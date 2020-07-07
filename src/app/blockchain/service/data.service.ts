import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Transaction } from "../model/transaction";
import { map, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    fetchTransactions(batchId: number): Observable<Transaction[]> {

        const columns = 'row_id,time,type,sender,volume';
        const receiver = 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo';
        const type = 'transaction';
        const limit = '10';
        const order = 'desc';
        const batch = batchId ? `&cursor.lte=${batchId}` : '';

        const url = `${environment.apiUrl}?columns=${columns}&receiver=${receiver}&type=${type}&limit=${limit}&order=${order}${batch}`

        return this.http.get(url)
            .pipe(
                map((trans: any[]) =>
                    trans.map(data => {

                        let transaction = {}

                        columns.split(',')
                            .forEach((col, idx) => {
                                transaction[col] = data[idx]
                            })

                        return transaction as Transaction;
                    })
                )
            );
    }

}
