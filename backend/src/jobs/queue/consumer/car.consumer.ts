import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('car-queue')
export class CarCounsumer {
    @Process('getAll-job')
    getAlljob(job: Job<unknown>) {
   
       return job.data
    }
}