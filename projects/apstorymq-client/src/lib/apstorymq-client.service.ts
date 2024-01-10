import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Messages } from '../model/messages';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApstorymqClientService {

  constructor(public http: HttpClient) { }

  private apiUrl: string;
  private client: string;
  private key: string;

  public async init(apiUrl: string, key: string, client: string) {
    this.apiUrl = apiUrl;
    this.key = key;
    this.client = client;
  }

  public async createSubscription(topic: string) {
    try {
      await this.http.get(this.apiUrl + 'message?key=' + this.key + '&client=' + this.client + '&topic=' + topic + '&pageSize=1');
    } catch (error) {
      await this.handleError(error);
    }
  }

  public async publish(topic: string, messages: Message[]): Promise<Message[]> {
    try {
      return await this.http.post<Message[]>(this.apiUrl + 'message?key=' + this.key + '&client=' + this.client + '&topic=' + topic, messages).toPromise();

    } catch (error) {
      await this.handleError(error);
    }
  }

  public async subscribe(topic: string): Promise<Messages> {
    try {
      return await this.http.get<Messages>(this.apiUrl + 'message?key=' + this.key + '&client=' + this.client + '&topic=' + topic + '&pageSize=200').toPromise();
    } catch (error) {
      await this.handleError(error);
    }
  }

  public async commit(topic: string, messageId: number): Promise<Boolean> {
    try {
      const response = await this.http.delete<Boolean>(this.apiUrl + 'message/' + messageId + '?key=' + this.key + '&client=' + this.client + '&topic=' + topic).toPromise();
      return response;
    } catch (error) {
      await this.handleError(error);
    }
  }

  public async commitMessageList(topic: string, messages: Message[]): Promise<Message[]> {
    try {
      const options = { body: messages };
      return await this.http.delete<Message[]>(this.apiUrl + 'message/?key=' + this.key + '&client=' + this.client + '&topic=' + topic,
      options).toPromise();
    } catch (error) {
      await this.handleError(error);
    }
  }

  private async handleError(error: Error) {
    console.error(error);
  }
}
