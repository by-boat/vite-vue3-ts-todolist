<script lang="tsx">
export default {
  name: "TableColumn",
  props: {
    tableColumns: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return () => {
      const { tableColumns } = props;
      const columnsSlots = tableColumns.map((colum) => {
        colum.align = "center";
        const { render, ...restAtts } = colum;
        if (typeof render === "function") {
          return (
            <el-table-column
              {...restAtts}
              v-slots={{
                default: (scope) => {
                  if (restAtts.prop) {
                    return render(scope?.row[restAtts.prop], scope);
                  }
                  return render(scope);
                },
              }}
            />
          );
        }
        return <el-table-column {...restAtts} />;
      });
      return (
        <el-table style={{ width: "800px", margin: "30px auto" }} border>
          {columnsSlots}
        </el-table>
      );
    };
  },
};
</script>
