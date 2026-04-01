  METHOD materialset_get_entityset.


    DATA: lt_entityset             TYPE TABLE OF zcad_mat270,
          lt_filter_select_options TYPE /iwbep/t_mgw_select_option,
          ls_filter_select_options TYPE /iwbep/s_mgw_select_option,
          ls_et_entityset          LIKE LINE OF et_entityset.

    DATA: lr_bukrs TYPE RANGE OF zcad_mat270-bukrs,
          lr_matnr TYPE RANGE OF zcad_mat270-matnr,
          lr_maktx TYPE RANGE OF zcad_mat270-maktx,
          lr_meins TYPE RANGE OF zcad_mat270-meins.

* Ler filtros enviados pelo OData
    lt_filter_select_options =
        io_tech_request_context->get_filter( )->get_filter_select_options( ).

    LOOP AT lt_filter_select_options INTO ls_filter_select_options.

      CASE ls_filter_select_options-property.

        WHEN 'BUKRS'.
          lr_bukrs = CORRESPONDING #( ls_filter_select_options-select_options ).

        WHEN 'MATNR'.
          lr_matnr = CORRESPONDING #( ls_filter_select_options-select_options ).

        WHEN 'MAKTX'.
          lr_maktx = CORRESPONDING #( ls_filter_select_options-select_options ).

        WHEN 'MEINS'.
          lr_meins = CORRESPONDING #( ls_filter_select_options-select_options ).

      ENDCASE.

    ENDLOOP.

* Buscar dados na tabela transparente
    SELECT *
      FROM zcad_mat270
      INTO TABLE @lt_entityset
     WHERE bukrs IN @lr_bukrs
       AND matnr IN @lr_matnr
       AND maktx IN @lr_maktx
       AND meins IN @lr_meins.

* Retornar para o OData
    LOOP AT lt_entityset INTO DATA(ls_entityset).
      MOVE-CORRESPONDING ls_entityset TO ls_et_entityset.
      INSERT ls_et_entityset INTO TABLE et_entityset.
    ENDLOOP.

  ENDMETHOD.