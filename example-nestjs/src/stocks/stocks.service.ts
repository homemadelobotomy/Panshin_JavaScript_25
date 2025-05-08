import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FileService } from 'src/file.service';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor (private fileService: FileService<Stock[]>) {}

  create(createStockDto: CreateStockDto) {
    const stocks = this.fileService.read();

    const stock = {...createStockDto, id: stocks.length + 1};
    this.fileService.add(stock) 
  }

  findAll(title?: string, tags ?:string[] | string): Stock[] {
    const stocks = this.fileService.read();
    if (typeof tags === 'string') {
      tags = [tags];
    }
    return stocks.filter((stock) =>{
        const matchTitle = title ?
          stock.title.toLowerCase().includes(title.toLowerCase())
          : true;
          const matchTags = tags?.length ?
          tags.some(tag =>
            stock.tags.some(stockTag =>
              stockTag.toLowerCase() === tag.toLowerCase()
            )
          ) 
          : true;
        return matchTags && matchTitle
        }
    );
  }

  findOne(id: number):Stock | null {
    const stocks = this.fileService.read();

    return stocks.find((stock) => stock.id == id) ?? null;
  }

  update(id: number, updateStockDto: UpdateStockDto): void {
    const stocks = this.fileService.read();
    const updatedStocks = stocks.map((stock) =>
      stock.id == id ? {...stock, ...updateStockDto} : stock,
  );
  this.fileService.write(updatedStocks)
  }

  remove(id: number): void{
    const filteredStocks = this.fileService
    .read()
    .filter((stock) => stock.id != id);
    this.fileService.write(filteredStocks);
  }
}
