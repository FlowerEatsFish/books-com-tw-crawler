const htmlCode = `
<table id="itemlist_table" class="table-searchlist clearfix">
  <colgroup>
    <col width="3%">
    <col width="17%">
    <col width="65%">
    <col width="15%">
  </colgroup>
  <tbody id="itemlist_0010856354">
    <tr>
      <td>
        <div class="box_1"></div>
      </td>
      <td>
        <h4></h4>
        <ul class="list-date clearfix"></ul>
        <ul class="list-nav clearfix"></ul>
        <div class="txt_cont"></div>
      </td>
      <td>
        <div class="btn-group-1 clearfix"></div>
      </td>
    </tr>
  </tbody>
  <tbody id="itemlist_F019878686">
  </tbody>
</table>
`;

export default htmlCode.replace(/^\s+/gm, "").replace(/\n/g, "");
