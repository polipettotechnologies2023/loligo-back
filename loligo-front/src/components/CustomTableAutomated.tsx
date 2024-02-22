import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";


export default function CustomTableAutomated( prop: any) {

    let automatedPatterns = prop.automatedPat;

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
      </TableHeader>

      <TableBody>
          {automatedPatterns.map((autoPat: any) => {
            return(
                <TableRow key={automatedPatterns.indexOf(autoPat)}>
                <TableCell>{autoPat}</TableCell>
                </TableRow>
            )
          })}
      </TableBody>
    </Table>
  );
}