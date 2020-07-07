import { HttpRequest } from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
    let backend: HttpTestingController;
    let dataService: DataService;
    const fakeResponse: any = [
        [
            14849341,
            1567721704000,
            "transaction",
            "tz1bDXD6nNSrebqmAnnKKwnX1QdePSMCj4MX",
            8001
        ]
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService]
        });

        backend = TestBed.get(HttpTestingController);
        dataService = TestBed.get(DataService);
    });

    afterEach(() => {
        backend.verify();
    });

    it('should fetch data from the server for the FIRST batch', (done) => {
        const batchId = null

        dataService
            .fetchTransactions(batchId)
            .subscribe(result => {
                expect(result[0].row_id).toEqual(fakeResponse[0][0]);
                done();
            });

        const req = backend.expectOne((http: HttpRequest<any>) => {
            return (
                http.urlWithParams === `https://api.tzstats.com/tables/op?columns=row_id,time,type,sender,volume&receiver=tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo&type=transaction&limit=10&order=desc`
                &&
                http.method === 'GET'
            );
        });

        req.flush(fakeResponse);
    });

    it('should fetch data from the server for the NEXT batch', (done) => {
        const batchId = 14849000

        dataService
            .fetchTransactions(batchId)
            .subscribe(result => {
                expect(result[0].row_id).toEqual(fakeResponse[0][0]);
                done();
            });

        const req = backend.expectOne((http: HttpRequest<any>) => {
            return (
                http.urlWithParams === `https://api.tzstats.com/tables/op?columns=row_id,time,type,sender,volume&receiver=tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo&type=transaction&limit=10&order=desc&cursor.lte=${batchId}`
                &&
                http.method === 'GET'
            );
        });

        req.flush(fakeResponse);
    });

});