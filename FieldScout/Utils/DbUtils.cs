using Microsoft.CodeAnalysis.Elfie.Serialization;
using Microsoft.Data.SqlClient;

namespace FieldScout.Utils
{
    public class DbUtils
    {
        // Get a string from a data reader object and handle NULL values
        // name="reader" A SqlDataReader that has not exhausted its result set
        // name="column" The name of the column from the result set referred to by the reader
        // returns the value of the column or null
        public static string GetString(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }

            return reader.GetString(ordinal);
        }

        public static bool GetBoolean(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return false;
            }

            return reader.GetBoolean(ordinal);
        }

        // Get an int from a data reader object, assuming the result is not NULL
        // column and reader explained above

    }
}
