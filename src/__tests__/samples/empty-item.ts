const htmlCode = `
<table id="itemlist_table" class="table-searchlist clearfix">
  <colgroup>
    <col width="3%">
    <col width="17%">
    <col width="65%">
    <col width="15%">
  </colgroup>
</table>
`;

export default htmlCode.replace(/^\s+/gm, "").replace(/\n/g, "");
